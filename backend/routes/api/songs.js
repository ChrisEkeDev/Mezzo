const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Artist, User, Song, Genre } = require('../../db/models')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Route for getting all songs
router.get('/', requireAuth, async(req, res) => {
    const songs = await Song.findAll({
        attributes: ["name", "id", "file"],
        include: [
            {
                model: Artist,
                attributes: ["name", "image"]
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
        attributes: ["name", "id", "file"],
        include: [
            {
                model: Artist,
                attributes: ["name", "image"]
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
                model: Artist,
                attributes: ["name", "image"]
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


module.exports = router;
