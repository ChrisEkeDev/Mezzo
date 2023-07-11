const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


// Route for user sign in
router.post('/', async(req, res, next) => {
    const { email, password } = req.body;

    const user = await User.unscoped().findOne({
        where: { email: email }
    })

    if (!user || !bcrypt.compareSync(password, user.password.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };


})


module.exports = router;
