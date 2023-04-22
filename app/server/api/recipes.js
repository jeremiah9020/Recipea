const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Recipe = require('../models/Recipe')
const Comment = require('../models/Comment')
const Rating = require('../models/Rating')
const Tag = require('../models/Tag')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const multer = require('multer')
const upload = multer()
const imagesPath = path.resolve(process.cwd(), 'server/images');

router.get('/', async (req, res, next) => {
    const userid = req.query.userid
    if (userid) {
        try {
            const recipes = await Recipe.findAll({where: {userid: userid}, order: [['updatedAt', 'DESC']]});
            if (recipes) {
                res.json(recipes);   
            } else {
                res.status(404).json({msg:"No user with that userid."});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        try {
            const recipes = await Recipe.findAll({order: [['updatedAt', 'DESC']]});
            res.json(recipes);
        } catch (error) {
            res.status(500).json(error);
        }
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
            return; // otherwise will send multiple responses
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

        //Enter the tags into the database instead of calling the api do it in the recipe
        //api
        let tags = req.body.tags.split(":")
        for(var t = 0; t < tags.length; t++)
        {
            if(! await Tag.findOne({where: {name:tags[t]}}))
            {
                await Tag.create  
                ({
                    name: tags[t],
                    tagcolor: 1234
                })
            }            
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/', authMiddleware, async (req, res, next) => { 
    const recipeid = req.body.recipeid

    const recipe = await Recipe.findByPk(recipeid)

    if (recipe) {
        const image = recipe.image


        if (image) {  
            try {
                fs.unlinkSync(`${imagesPath}/${image}`)
            } catch (e) {
                res.status(500).json(e);
                return; // otherwise will send multiple responses
            }
        }
    
        recipe.destroy()
        Comment.destroy({where:{recipeid:recipeid}})
        Rating.destroy({where:{recipeid:recipeid}})
        res.status(200).send("Deleted")
        return
    }
    res.status(404).send("Not Found")
})

module.exports = router