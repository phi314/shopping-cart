const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item model
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all field' });
    }

    // Check existing email
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Validate password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            );
        });
    });
});

// @route GET api/auth/user
// @desc Get users from token
// @access private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;
