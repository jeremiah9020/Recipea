const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

router.post('/image', (req, res, next) => {
    console.log(req.body);
})

module.exports = router;