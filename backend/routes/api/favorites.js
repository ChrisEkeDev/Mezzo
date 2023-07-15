const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Artist, User, Song, Genre, Playlist, UserArtistFavorite, UserSongFavorite } = require('../../db/models')
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Routes for getting favorites artists
router.get('/artists', requireAuth, async(req, res) => {
    const user = req.user;
    const favoriteArtists = await UserArtistFavorite.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Artist
            }
        ]
    })

    return res.status(200).json({
        FavoriteArtists: favoriteArtists
    })
})

// Route for adding an artist to favorites
router.post('/artists', requireAuth, async(req, res) => {
    const user = req.user;
    const { artistId } = req.body;
    const artistFavorite = await UserArtistFavorite.findOne({
        where: {
            [Op.and]: [
                { artistId: artistId},
                { userId: user.id}
            ]
        }
    })

    if (artistFavorite) {
        return res.status(404).json({
            message: "This artist is already in your favorites."
        })
    }

    await UserArtistFavorite.create({
        userId: user.id,
        artistId: artistId
    })

    const favoriteArtists = await UserArtistFavorite.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Artist
            }
        ]
    })

    return res.status(200).json({
        message: { message: "Artist was added to favorites successfully."},
        FavoriteArtists: favoriteArtists
    })
})

// Route for removing artist from favorties
router.delete('/artists', requireAuth, async(req, res) => {
    const user = req.user;
    const { artistId } = req.body;

    const artistFavorite = await UserArtistFavorite.findOne({
        where: {
            [Op.and]: [
                { artistId: artistId},
                { userId: user.id}
            ]
        }
    })

    if (!artistFavorite) {
        return res.status(404).json({
            message: "This artist isn't in your favorites."
        })
    }

    if (user.id === artistFavorite.userId) {
        await artistFavorite.destroy();

        const favoriteArtists = await UserArtistFavorite.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Artist
                }
            ]
        })

        return res.status(200).json({
            message: { message: 'Artist was removed from favorites successfully.'},
            FavoriteArtists: favoriteArtists
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }

})

// Routes for getting favorites songs
router.get('/songs', requireAuth, async(req, res) => {
    const user = req.user;
    const favoriteSongs = await UserSongFavorite.findAll({
        where: {
            userId: user.id
        },
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
        FavoriteSongs: favoriteSongs
    })
})

// Route for adding an song to favorites
router.post('/songs', requireAuth, async(req, res) => {
    const user = req.user;
    const { songId } = req.body;
    const songFavorite = await UserSongFavorite.findOne({
        where: {
            [Op.and]: [
                { songId: songId},
                { userId: user.id}
            ]
        }
    })

    if (songFavorite) {
        return res.status(404).json({
            message: "This song is already in your favorites."
        })
    }

    await UserSongFavorite.create({
        userId: user.id,
        songId: songId
    })

    const favoriteSongs = await UserSongFavorite.findAll({
        where: {
            userId: user.id
        },
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
        message: { message: "Song was added to favorites successfully." },
        FavoriteSongs: favoriteSongs
    })

})

// Route for removing artist from favorties
router.delete('/songs', requireAuth, async(req, res) => {
    const user = req.user;
    const { songId } = req.body;

    const songFavorite = await UserSongFavorite.findOne({
        where: {
            [Op.and]: [
                { songId: songId},
                { userId: user.id}
            ]
        }
    })

    if (!songFavorite) {
        return res.status(404).json({
            message: "This song isn't in your favorites."
        })
    }

    if (user.id === songFavorite.userId) {
        await songFavorite.destroy();

        const favoriteSongs = await UserSongFavorite.findAll({
            where: {
                userId: user.id
            },
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
            message: { message: 'Song was removed from favorites successfully.' },
            FavoriteSongs: favoriteSongs
        })
    } else {
        return res.status(403).json({
            message: "You're not authorized to perform this action."
        })
    }

})


module.exports = router;
