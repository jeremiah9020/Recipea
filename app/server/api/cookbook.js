const express = require('express')
const router = express.Router()
const Cookbook = require('../models/Cookbook');


//get a specific cookbook
router.get('/:userid', async (req, res, next) => {
    try {
        const cookbook = await Cookbook.findAll({where:{userid:req.params.userid}})
        res.json(cookbook)
    } catch (error) {
        res.status(500).json(error);
    }
});

//May not need but will still keep
router.get('/', async (req, res, next) => {
    try {
        const cookbook = await Cookbook.findAll();
        res.json(cookbook);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const cookbook = await Cookbook.create({
            userid: req.body.userid,
            cookbookname: req.body.cookbookname,
            recipes: null
        });    
        res.json(cookbook);
    } catch (error) {
        res.status(500).json(error);
    }
})


router.delete('/', async (req, res, next) => {
    const id = req.body.userid
    try {
        const cb = await Cookbook.findOne({where: {userid:req.body.userid,cookbookname:req.body.cookbookname }})
        cb.destroy()
        res.send(`Deleted Recipe`)
    } catch (err) {
        res.send(`Can't find`)
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const cookbook = await Cookbook.findOne({where: {userid:req.body.userid,cookbookname:req.body.cookbookname }})
        cookbook.update({recipes: req.body.recipes + ':' + cookbook.recipes})
        res.send(`Updated`)
    } catch (err) {
        res.send(`Not found`)
    }
})

module.exports = router