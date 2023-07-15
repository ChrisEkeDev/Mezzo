const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Artist, User, Song, Genre } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Route for getting all artists
router.get('/', requireAuth, async(req, res) => {
    const artists = await Artist.findAll()
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
        }
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
                attributes: ["name", "id", "file", "genreId"],
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

// Validate creating artist
const validateCreateArtist = [
    check('name').exists({checkFalsy: true}).withMessage('Please enter a name for the artist.'),
    check('name').isLength({min: 1, max: 30}).withMessage('Name must between 1 and 30 characters.'),
    check('bio').isLength({max: 500}).withMessage('Bio can\'t be over 500 characters.'),
    handleValidationErrors
]

// Route for creating an artist
router.post('/', requireAuth, validateCreateArtist, async(req, res) => {
    const user = req.user;
    const { name, bio, image } = req.body;
    const newArtist = await Artist.create({
        userId: user.id,
        name,
        bio,
        image: image ? image : null
    })

    const artist = await Artist.findByPk(newArtist.id)

    return res.status(200).json({
        message: { message: 'Artist was created successfully.'},
        Artist: artist
    })
})

// Validate Update artist
const validateUpdateArtist = [
    check('name').optional().exists({checkFalsy: true}).withMessage('Please enter a name for the artist.'),
    check('name').optional().isLength({min: 1, max: 30}).withMessage('Name must between 1 and 30 characters.'),
    check('bio').optional().isLength({max: 500}).withMessage('Bio can\'t be over 500 characters.'),
    handleValidationErrors
]

// Route for updating artist
router.put('/:artistId', requireAuth, validateUpdateArtist, async(req, res) => {
    const user = req.user;
    const { artistId } = req.params;
    const { name, bio, image } = req.body;

    const artist = await Artist.findByPk(artistId)

    if (!artist) {
        return res.status(404).json({
            message: "Artist couldn't be found."
        })
    }

    if (user.id === artist.userId) {
        await artist.set({
            name: name ? name : artist.name,
            bio: bio ? bio : artist.bio,
            image: image ? image : artist.image
        })

        await artist.save()

        const updatedArtist = await Artist.findByPk(artistId, {
            include: [
                {
                    model: User,
                    attributes: ["id", "username"]
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
