var express = require('express');
var router = express.Router();
var recipeApiRouter = require('../api/recipe-api');

router.use('/recipe', recipeApiRouter);

router.get('/', (req, res, next) => {
    res.send('recipea api router');
});

module.exports = router;