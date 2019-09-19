const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access public
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users));
});

// @route POST api/users
// @desc Get Register user
// @access public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    console.log(req);
    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all field' });
    }

    // Check existing email
    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email already exist' });
        } else {
            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => {
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
        }
    });
});

module.exports = router;
