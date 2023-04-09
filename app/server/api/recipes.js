const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Recipe = require('../models/Recipe')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const multer = require('multer')
const upload = multer()
const imagesPath = path.resolve(process.cwd(), 'server/images');

router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res, next) => { 
    let image = null
    if (req.file) {
        const name = req.file.originalname
        const nameArray = name.split('.')
        const extension = nameArray[nameArray.length - 1]
        const uid = uuid.v4()
        const buffer = req.file.buffer
    
        const filepath = `${uid}.${extension}`

        try {
            fs.writeFileSync(`${imagesPath}/${filepath}`, buffer)
        } catch (e) {
            res.status(500).json(e);
            return;
        }

        image = filepath
    }

    try {
        const recipe = await Recipe.create({
            userid: req.user.id,
            title: req.body.title,
            image: image,
            time: req.body.time,
            ingredients: req.body.ingredients,
            tags: req.body.tags,
            steps: req.body.steps,
            description: req.body.description
        });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router