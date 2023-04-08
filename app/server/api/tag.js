const express = require('express')
const router = express.Router()
const Tag = require('../models/Tag')


//This works to check I went to http://localhost:3001/api/tag and the tag objects were present
router.get('/', async (req, res, next) => {
    try {
        const tag = await Tag.findAll();
        console.log(tag);
        res.json(tag);
    } catch (error) {
        res.status(500).json(error);
    }
});

//This needs to be looked at...
router.post('/', async (req, res, next) => {
    try {
        const tag = await Tag.create({
            name: req.body.name,
            tagcolor: 1234
        });
        res.json(tag);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router