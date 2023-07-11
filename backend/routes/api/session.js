const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// Route for restoring session
router.get('/', (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );


// Validate sign in
const validateSignIn = [
  check('email').exists({ checkFalsy: true }).notEmpty().isEmail()
    .withMessage('Please provide a valid email or username.'),
  check('password').exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Route for user sign in
router.post('/', validateSignIn, async(req, res, next) => {
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

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
})

// Route for user sign out
router.delete('/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );



module.exports = router;
