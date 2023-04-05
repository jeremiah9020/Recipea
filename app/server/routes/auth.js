const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/login', async (req, res, _) => {
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({ where: { username: username } })

    if (user == null) {
        res.status(401).json({ msg: 'Incorrect username/password.' })
    } else {
        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            if (err) {
                res.status(500).json({ msg: 'Internal error.' })
            } else {
                if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                    res.status(401).json({ msg: 'Incorrect username/password.' })
                } else {
                    const token = jwt.sign(
                        {
                            id: user.id,
                            username: user.username
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "30d" }
                    );
                    res.status(200).json(token)
                }
            }
        })
    }
})

router.post('/register', (req, res, _) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
        if (err) { res.status(500).json({ msg: 'Internal error.' }) }
        try {
            const user = await User.create({ email: email, username: username, password: hashedPassword, salt: salt })
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username
                },
                "RANDOM-TOKEN",
                { expiresIn: "30d" }
            );
            res.status(200).json({ msg: 'Successfully signed in.', token: token })
        } catch (e) {
            res.status(500).json({ msg: e.name })
        }
    })
})

module.exports = router