const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Recipe = require('../models/Recipe')

router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const recipe = await Recipe.create({
            userid: req.user.id,
            title: req.body.title,
            image: req.body.image,
            time: req.body.time,
            ingredients: req.body.ingredients,
            tags: req.body.tags,
            steps: req.body.steps,
            description: req.body.description
        });
        res.json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router