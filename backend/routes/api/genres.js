const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Genre } = require('../../db/models')
const router = express.Router();


// Get all Genres
router.get('/', requireAuth, async(req, res) => {
    const genres = await Genre.findAll({
        attributes: ["id", "name"]
    })
    res.status(200).json(genres)
})


module.exports = router;
