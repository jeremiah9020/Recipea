const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const handlebars = require('handlebars')
const User = require('../models/User')
const UserProfile = require('../models/UserProfile');
const Cookbook = require('../models/Cookbook');
const path = require('path');

const AuthMiddleware = require("../middleware/auth");
const { readFileSync } = require('fs');
const router = express.Router()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'help.recipea@gmail.com',
    pass: 'ulykpgjuzqbguvwv'
  }
});
const publicPath = path.resolve(process.cwd(), 'server/public');
const forgotPasswordEmail = readFileSync(publicPath + '/forgotpassword.html',{encoding: 'utf-8'})

function setTokens(user, res) {
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
  res.cookie('access_token', access_token, { httpOnly: true, expires: new Date(Date.now() + 5 * 60 * 1000), sameSite: "strict" })
  res.cookie('refresh_token', refresh_token, { httpOnly: true, expires: new Date(Date.now() + 30 * 2460 * 60 * 1000), sameSite: "strict" })
  return [access_token, refresh_token]
}

router.get('/check', AuthMiddleware, (req, res,) => {
  res.status(200).json({ msg: 'Authorized' })
})

router.post('/logout', (req, res, _) => {
  res.cookie('access_token', 'loggedout', { httpOnly: true, sameSite: "strict" })
  res.cookie('refresh_token', 'loggedout', { httpOnly: true, sameSite: "strict" })
  res.status(200).json({ msg: 'Logged out' })
})

router.post('/login', async (req, res, _) => {
  const username = req.body.username
  const password = req.body.password
  const userByUsername = await User.findOne({ where: { username: username } })
  const userByEmail = await User.findOne({ where: { email: username } })

  if (userByEmail == null && userByUsername == null) {
    res.status(401).json({ msg: 'Incorrect email/username/password.' })
  } else {
    const user = (userByEmail != null) ? userByEmail : userByUsername
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
      if (err) {
        res.status(500).json({ msg: 'Internal error.' })
      } else {
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          res.status(401).json({ msg: 'Incorrect email/username/password.' })
        } else {
          const [access_token,] = setTokens(user, res)
          res.status(200).json(access_token)
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
      const profile = await UserProfile.create({ userid: user.id, username: username});
      const cookbook = await Cookbook.create({userid: user.id, cookbookname: 'default', recipes:null})
      const [access_token,] = setTokens(user, res)
      res.status(200).json(access_token)
    } catch (e) {
      res.status(409).json({ msg: e })
    }
  })
})

router.post('/forgotpassword', async (req, res, _) => {
  const email = req.body.email
  const user = await User.findOne({ where: { email: email } })

  if (user == null) {
    res.status(404).json({ msg: "No user with that email." })
  } else {
    const reset_token = jwt.sign(
      {
        id: user.id,
      },
      "RESET-TOKEN",
      { expiresIn: "30m" }
    )

    const action_url = `http://localhost:3000/password-reset?token=${reset_token}`
    const name = user.username
    const template = handlebars.compile(forgotPasswordEmail);
    let data = {
        name: name,
        action_url: action_url
    };
    let htmlToSend = template(data);
    const mailOptions = {
      from: 'Recipea Help Team',
      to: req.body.email,
      subject: 'Recipea - Forgot Password?',
      html: htmlToSend,
      attachments: [{
        filename: 'forgotpassword.png',
        path: publicPath + '/forgotpassword.jpg',
        cid: 'title'
   }]
    }

    transporter.sendMail(mailOptions, function (error, info) {
      res.status(200).json({msg:"Email sent"})
    })
  }
})

router.post('/resetpassword', async (req, res, _) => {
  const token = req.body.token
  const newPassword = req.body.new

  try {
    const decodedToken = await jwt.verify(token, "RESET-TOKEN");
    const user = await decodedToken;
  
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(newPassword, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
      if (err) { res.status(500).json({ msg: 'Internal error.' }) }
      try {
        const userData = await User.findByPk(user.id)
  
        if (userData == null) {
          res.status(404).json({ msg: "user not found" })
        } else {
          userData.update({password: hashedPassword, salt: salt})
        }
  
        const [access_token,] = setTokens(userData, res)
        res.status(200).json(access_token)
      } catch (e) {
        res.status(500).json({ msg: 'Internal error' })    }
    })
  } catch (e) {
    res.status(500).json({ msg: 'Token Expired' })
  }
})

module.exports = router