const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Artist, User, Song, Genre } = require('../../db/models')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const AWS = require('aws-sdk');
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


// Route for getting all songs
router.get('/', requireAuth, async(req, res) => {
    const songs = await Song.findAll({
        include: [
            {
                model: Artist,
                attributes: ["id", "name", "image", "userId"]
            },
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    })
    return res.status(200).json({
        Songs: songs
    })
})

router.get('/current', requireAuth, async(req, res) => {
    const user = req.user;

    const artistIds = await Artist.findAll({
        where: {
            userId: user.id
        },
        attributes: ["id"]
    })

    const ids = artistIds.map(artist => artist.id)

    const songs = await Song.findAll({
        where: {
            artistId: ids
        },
        include: [
            {
                model: Artist,
                attributes: ["id", "name", "image", "userId"]
            },
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    })

    return res.status(200).json({
        Songs: songs
    })
})

// Route for getting song by Id
router.get('/:songId', requireAuth, async(req, res) => {
    const { songId } = req.params;
    const song = await Song.findByPk(songId, {
        include: [
            {
                model: Artist
            },
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    })

    if (!song) {
        return res.status(404).json({
            message: "Song couldn't be found."
        })
    }

    return res.status(200).json({
        Song: song
    })
})


// Route for creating a song
router.post('/', requireAuth, upload.single('song'), async(req, res) => {
    const { name, description, genreId, artistId } = req.body;
    const song = req.file;

    const newSong = await Song.create({
        name,
        description,
        song: song.location,
        genreId,
        artistId
    })

    const theSong = await Song.findByPk(newSong.id, {
        include: [
            {
                model: Artist,
                attributes: ["id", "name", "image", "userId"]
            },
            {
                model: Genre,
                attributes: ["name"]
            }
        ]
    })

    return res.status(200).json({
        message: { message: 'Song was created successfully.'},
        Song: theSong
    })
})


// Route for updating a song
router.put('/:songId', requireAuth, upload.single('song'), async(req, res) => {
    const user = req.user;
    const { songId } = req.params;
    const { name, description, genreId } = req.body;
    const song = req.file

    const thisSong = await Song.findByPk(songId)
    const artist = await Artist.findByPk(thisSong.artistId)

    if (!thisSong) {
        return res.status(404).json({
            message: "Song couldn't be found."
        })
    }

    if (user.id === artist.userId) {
        if (song) {
            const songKey = thisSong.song.split('/');
            const songKeyUnencoded = songKey[songKey.length - 1];
            const key = decodeURI(songKeyUnencoded)
            const params = {
                Bucket: "mezzo-bucket",
                Key: key
            }
            await s3.deleteObject(params).promise()
        }
        await thisSong.set({
            name,
            description,
            song: song ? song.location : thisSong.song,
            genreId
        })

        await thisSong.save()

        const updatedSong = await Song.findByPk(songId, {
            include: [
                {
                    model: Artist,
                    attributes: ["id", "name", "image", "userId"]
                },
                {
                    model: Genre,
                    attributes: ["name"]
                }
            ]
        })

        return res.status(200).json({
            message: { message: 'Song was updated successfully. '},
            Song: updatedSong
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})

// Route for deleting a song
router.delete('/:songId', requireAuth, async(req, res) => {
    const user = req.user
    const { songId } = req.params;
    const song = await Song.findByPk(songId)
    const artist = await Artist.findByPk(song.artistId);

    if (!song) {
        return res.status(404).json({
            message: "Song couldn't be found."
        })
    }

    if (user.id === artist.userId) {
        const songKey = song.song.split('/');
        const songKeyUnencoded = songKey[songKey.length - 1];
        const key = decodeURI(songKeyUnencoded)
        const params = {
            Bucket: "mezzo-bucket",
            Key: key
        }
        await s3.deleteObject(params).promise()
        await song.destroy();
        return res.status(200).json({
            message: 'Song was deleted successfully.'
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})


module.exports = router;
