const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const AuthMiddleware = require("../middleware/auth")
const router = express.Router()

function setTokens(user,res) {
    const access_token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        "RANDOM-TOKEN",
        { expiresIn: "5m" }
    );
    const refresh_token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        "RANDOM-TOKEN",
        { expiresIn: "30d" }
    )
    res.cookie('access_token',access_token,{httpOnly:true, expires: new Date(Date.now() + 5*60*1000), sameSite: "strict"})
    res.cookie('refresh_token',refresh_token,{httpOnly:true, expires: new Date(Date.now() + 30*2460*60*1000), sameSite: "strict"})
    return [access_token,refresh_token]
}

router.get('/check', AuthMiddleware, (req, res, ) => {
    console.log(req.cookies)
    res.status(200).json({ msg: 'Authorized' })
})

router.post('/logout', (req, res, _) => {
    res.cookie('access_token','loggedout',{httpOnly:true, sameSite: "strict"})
    res.cookie('refresh_token','loggedout',{httpOnly:true, sameSite: "strict"})
    res.status(200).json({ msg: 'Logged out' })
})

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
                    const [access_token,] = setTokens(user,res)
                    res.status(200).json(access_token)
                }
            }
        })
    }
})

router.post('/register', (req, res, _) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
        if (err) { res.status(500).json({ msg: 'Internal error.' }) }
        try {
            const user = await User.create({ email: email, username: username, password: hashedPassword, salt: salt })
            const [access_token,] = setTokens(user,res)
            res.status(200).json(access_token)
        } catch (e) {
            res.status(500).json({ msg: e.name })
        }
    })
})

module.exports = router