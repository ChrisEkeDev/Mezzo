const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Artist, User, Song, Genre, Playlist, PlaylistSong } = require('../../db/models')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Route Get Playlists for User
router.get('/', requireAuth, async (req, res) => {
    const user = req.user;

    const playlists = await Playlist.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: PlaylistSong
            }
        ]
    })

    return res.status(200).json({
        Playlists: playlists
    })
})

// Route to Get a Specific Playlist
router.get('/:playlistId', requireAuth, async(req, res) => {
    const user = req.user;
    const { playlistId } = req.params;

    const playlist = await Playlist.findByPk(playlistId, {
        include: [
            {
                model: Song,
                include: [
                    {
                        model: Artist
                    },
                    {
                        model: Genre
                    },
                    {
                        model: PlaylistSong
                    }
                ]
            }
        ]
    })

    if (user.id === playlist.userId) {
        return res.status(200).json({
            Playlist: playlist
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})

// Validate Create Playlist
const validateCreatePlaylist = [
    check("name").exists({checkFalsy: true}).withMessage('Please enter a name for the song.'),
    handleValidationErrors
]

// Route for Create a Playlist
router.post('/', requireAuth, validateCreatePlaylist, async(req, res) => {
    const user = req.user;
    const { name } = req.body;
    const newPlaylist = await Playlist.create({
        userId: user.id,
        name
    })

    const playlist = await Playlist.findByPk(newPlaylist.id, {
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
        message: { message: 'Playlist was created successfully.'},
        Playlist: playlist
    })

})

// Validate Update Playlist name
const validateUpdatePlaylist = [
    check("name").optional().exists({checkFalsy: true}).withMessage('Please enter a name for the song.'),
    handleValidationErrors
]

// Route for update Playlist name
router.put('/:playlistId', requireAuth, validateUpdatePlaylist, async(req, res) => {
    const user = req.user;
    const { playlistId } = req.params;
    const { name } = req.body;

    const playlist = await Playlist.findByPk(playlistId)

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found."
        })
    }

    if (user.id === playlist.userId) {
        await playlist.set({
            name: name ? name : playlist.name
        })

        await playlist.save();

        const updatedPlaylist = await Playlist.findByPk(playlistId, {
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
            message: { message: 'Playlist was updated successfully. '},
            Playlist: updatedPlaylist
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})

//Route for deleting playlist
router.delete('/:playlistId', requireAuth, async(req, res) => {
    const user = req.user;
    const { playlistId } = req.params;
    const playlist = await Playlist.findByPk(playlistId)

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found."
        })
    }

    if (user.id === playlist.userId) {
        await playlist.destroy();
        return res.status(200).json({
            message: 'Playlist was deleted successfully.'
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})

// Route to add song to playlist
router.post('/:playlistId/add', requireAuth, async(req, res) => {
    const user = req.user;
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(playlistId)

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found."
        })
    }

    const playlistSong = await PlaylistSong.findOne({
        where: {
            [Op.and]: [
                {playlistId: playlistId},
                {songId: songId}
            ]
        }
    })

    if (playlistSong) {
        return res.status(400).json({
            message: "This song is already in this playlist."
        })
    }


    if (user.id === playlist.userId) {
        await PlaylistSong.create({
            playlistId,
            songId
        })

        const updatedPlaylist = await Playlist.findByPk(playlistId, {
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
            message: { message: "Song added to the playlist successfully."},
            Playlist: updatedPlaylist
        })

    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }

})

// Route to remove a song from the playlist
router.delete('/:playlistId/remove', requireAuth, async(req, res) => {
    const user = req.user;
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(playlistId)

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist couldn't be found."
        })
    }

    const playlistSong = await PlaylistSong.findOne({
        where: {
            [Op.and]: [
                {playlistId: playlistId},
                {songId: songId}
            ]
        }
    })

    if (!playlistSong) {
        return res.status(404).json({
            message: "This song isn't in this playlist."
        })
    }

    if (user.id === playlist.userId) {
        await playlistSong.destroy()
        const updatedPlaylist = await Playlist.findByPk(playlistId, {
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
            message: { message: 'Song was removed from playlist successfully.'},
            Playlist: updatedPlaylist
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }
})

module.exports = router;
