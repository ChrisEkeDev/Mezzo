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
        attributes: ["name", "id", "file", "genreId"],
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
        attributes: ["name", "id", "file", "genreId"],
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
                model: Artist,
                attributes: ["id", "name", "image", "userId"]
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

// Route for getting songs of certain genre
router.get('/:genreName', requireAuth, async(req, res) => {
    const { genreName } = req.params;
    const genre = await Genre.findOne({
        where: {
            name: genreName
        }
    })

    if (!genre) {
        return res.status(404).json({
            message: "Genre couldn't be found."
        })
    }

    const songs = await Song.findAll({
        where: {
            genreId: genre.id
        },
        attributes: ["name", "id", "file", "genreId"],
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

// Validate creating song
const validateCreateSong = [
    check("name").exists({checkFalsy: true}).withMessage('Please enter a name for the song.'),
    check("description").isLength({max: 500}).withMessage('Description can\'t be over 500 characters.'),
    check("file").exists({checkFalsy: true}).withMessage('Please provide a file for the song.'),
    check("genreId").exists({checkFalsy: true}).withMessage('Please select a genre for the song.'),
    check("artistId").exists({checkFalsy: true}).withMessage('The song must belong to an artist.'),
    handleValidationErrors
]

// Route for creating a song
router.post('/', requireAuth, validateCreateSong, async(req, res) => {
    const { name, description, file, genreId, artistId } = req.body;
    const newSong = await Song.create({
        name,
        description,
        file,
        genreId,
        artistId
    })

    const song = await Song.findByPk(newSong.id, {
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
        Song: song
    })
})

const validateUpdateSong = [
    check("name").optional().exists({checkFalsy: true}).withMessage('Please enter a name for the song.'),
    check("description").optional().isLength({max: 500}).withMessage('Description can\'t be over 500 characters.'),
    check("file").optional().exists({checkFalsy: true}).withMessage('Please provide a file for the song.'),
    check("genreId").optional().exists({checkFalsy: true}).withMessage('Please select a genre for the song.'),
    handleValidationErrors
]

// Route for updating a song
router.put('/:songId', requireAuth, validateUpdateSong, async(req, res) => {
    const user = req.user;
    const { songId } = req.params;
    const { name, description, file, genreId, artistId } = req.body;

    const artist = await Artist.findByPk(artistId)
    const song = await Song.findByPk(songId)

    if (!song) {
        return res.status(404).json({
            message: "Song couldn't be found."
        })
    }

    if (user.id === artist.userId) {
        await song.set({
            name: name ? name : song.name,
            description: description ? description : song.description,
            file: file ? file : song.file,
            genreId: genreId ? genreId : song.genreId
        })

        await song.save()

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
