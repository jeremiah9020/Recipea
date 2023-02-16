const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const User = require('../schema/User')

router.post('/register',  async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        try {
            const newUser = await user.save()
            res.status(201).json(newUser)
        } catch (err) {
            res.status(400).json({ message: err.message})
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.post('/login', async (req,res) => {
    const byEmail = await User.findOne({ email: req.body.name })
    const byUsername = await User.findOne({ username: req.body.name })

    if (byEmail == null && byUsername == null) {
        res.status(208).json({ message: "No account had been registered under that username/email."})
    }

    let passMatch, user
    if (byEmail != null) {
        user = byEmail
        passMatch = await bcrypt.compare(req.body.password, byEmail.password)
    } else {
        user = byUsername
        passMatch = await bcrypt.compare(req.body.password, byUsername.password)
    }

    if (passMatch) {
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
            userName: user.username,
          },
          "RANDOM-TOKEN",
          { expiresIn: "30d" }
        )

        res.status(200).send({
            message: "Login Successful",
            email: user.email,
            username: user.username,
            token
          });
    } else {
        res.status(400).json({ message: "Passwords does not match" })
    }
})

module.exports = router