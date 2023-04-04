var express = require('express');
var router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', (req, res, next) => {
    res.send('in recipe api');
})

module.exports = router;