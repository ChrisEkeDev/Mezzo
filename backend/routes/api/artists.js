const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Artist, User, Song, Genre } = require('../../db/models')
const { check } = require('express-validator');
const AWS = require('aws-sdk');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const s3 = new AWS.S3();

AWS.config.update({
    region: process.env.AWS_S3_REGION,
})

router.use(bodyParser.json())

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'mezzo-bucket',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
})

// Route for getting all artists
router.get('/', requireAuth, async(req, res) => {
    const artists = await Artist.findAll({
        include: [{
            model: Song,
            include: [
                { model: Genre },
                { model: Artist }
            ]
        }]
    })
    return res.status(200).json({
        Artists: artists
    })
})

//Route for getting current user artists
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user;
    const artists = await Artist.findAll({
        where: {
            userId: user.id
        },
        include: [{
            model: Song,
            include: [
                { model: Genre },
                { model: Artist }
            ]
        }]
    })

    return res.status(200).json({
        Artists: artists
    })
})

// Route for getting artist by ID
router.get('/:artistId', requireAuth, async(req, res) => {
    const { artistId } = req.params;
    const artist = await Artist.findByPk(artistId, {
        include: [
            {
                model: User,
                attributes: ["id", "username"]
            },
            {
                model: Song,
                attributes: ["name", "id", "song", "genreId"],
                include: [
                    {
                        model: Genre,
                        attributes: ["name"]
                    },
                    {
                        model: Artist
                    }
                ]
            }
        ]
    })

    if (!artist) {
        return res.status(404).json({
            message: "Artist couldn't be found."
        })
    }

    return res.status(200).json({
        Artist: artist
    })
})

// Route for creating an artist
router.post('/', requireAuth, upload.single('image'), async(req, res) => {
    const user = req.user;
    const { name, bio } = req.body;
    const image = req.file;
    const newArtist = await Artist.create({
        userId: user.id,
        name,
        bio,
        image: image ? image.location : null
    })

    const artist = await Artist.findByPk(newArtist.id, {
        include: [
            {
                model: Song,
                include: [
                    {
                        model: Artist
                    },
                    {
                        model: Genre
                    }
                ]
            }
        ]
    })

    return res.status(200).json({
        message: { message: 'Artist was created successfully.'},
        Artist: artist
    })
})


// Route for updating artist
router.put('/:artistId', requireAuth,  upload.single('image'), async(req, res) => {
    const user = req.user;
    const { artistId } = req.params;
    const { name, bio } = req.body;
    const image = req.file;

    const artist = await Artist.findByPk(artistId)

    if (!artist) {
        return res.status(404).json({
            message: "Artist couldn't be found."
        })
    }

    if (user.id === artist.userId) {
        const imageKey = artist.image.split('/');
        const imageKeyUnencoded = imageKey[imageKey.length - 1];
        const key = decodeURI(imageKeyUnencoded)
        const params = {
            Bucket: "mezzo-bucket",
            Key: key
        }
        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log({error: err, message: "There was an issue deleting the old image.", data})
            }
        })

        await artist.set({
            name: name ? name : artist.name,
            bio: bio ? bio : artist.bio,
            image: image ? image.location : artist.image
        })

        await artist.save()

        const updatedArtist = await Artist.findByPk(artistId, {
            include: [
                {
                    model: User,
                    attributes: ["id", "username"]
                },
                {
                    model: Song,
                    include: [
                        {
                            model: Artist
                        },
                        {
                            model: Genre
                        }
                    ]
                }
            ]
        })

        return res.status(200).json({
            message: { message: 'Artist was updated successfully.'},
            Artist: updatedArtist
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})

// Route for deleting an artist
router.delete('/:artistId', requireAuth, async(req, res) => {
    const user = req.user
    const { artistId } = req.params;
    const artist = await Artist.findByPk(artistId)

    if (!artist) {
        return res.status(404).json({
            message: "Artist couldn't be found."
        })
    }

    if (user.id === artist.userId) {
        if (artist.image) {
            const imageKey = artist.image.split('/');
            const imageKeyUnencoded = imageKey[imageKey.length - 1];
            const key = decodeURI(imageKeyUnencoded)
            const params = {
                Bucket: "mezzo-bucket",
                Key: key
            }
            await s3.deleteObject(params).promise()
        }

        const artistSongs = await Song.findAll({
            where: {
                artistId: artistId
            }
        })

        if (artistSongs.length) {
            artistSongs.forEach(async (song) => {
                const songKey = song.song.split('/');
                const songKeyUnencoded = songKey[songKey.length - 1];
                const key = decodeURI(songKeyUnencoded)
                const params = {
                    Bucket: "mezzo-bucket",
                    Key: key
                }
                await s3.deleteObject(params).promise()
            })

        }

        await artist.destroy();
        return res.status(200).json({
            message: 'Artist was deleted successfully.'
        })

    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }

})

module.exports = router;
