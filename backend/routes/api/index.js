const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const artistsRouter = require('./artists.js');
const songsRouter = require('./songs.js');
const genresRouter = require('./genres.js');
const playlistsRouter = require('./playlists.js')
const favoritesRouter = require('./favorites.js')
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/artists', artistsRouter);

router.use('/songs', songsRouter);

router.use('/genres', genresRouter);

router.use('/playlists', playlistsRouter);

router.use('/favorites', favoritesRouter);


module.exports = router;
