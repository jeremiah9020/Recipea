const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const UserProfile = require('../models/UserProfile')

router.get('/', async (req, res, next) => {
    const username = req.query.username
    if (username) {
        try {
            const profile = await UserProfile.findOne({where: {username: username}});
            if (profile) {
                res.json(profile);   
            } else {
                res.status(404).json({msg:"No user with that username."});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        try {
            const profiles = await UserProfile.findAll();
            res.json(profiles);   
        } catch (error) {
            res.status(500).json(error);
        }
    }   
})

router.get('/authenticated', authMiddleware, async (req, res, next) => {
    try {
        const profile = await UserProfile.findByPk(req.user.id);
        if (profile !== null)
        {
            res.json(profile);
        } else {
            res.json(`failed to find user with id ${req.user.id}`);
        }
    } catch(error) {
        res.status(500).json(error);
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const profile = await UserProfile.findByPk(id);
        if (profile !== null)
        {
            res.json(profile);
        } else {
            res.json(`failed to find user with id ${id}`);
        }
    } catch(error) {
        res.status(500).json(error);
    }
})



module.exports = router;