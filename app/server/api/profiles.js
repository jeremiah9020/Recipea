const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const UserProfile = require('../models/UserProfile')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const multer = require('multer')
const upload = multer()
const imagesPath = path.resolve(process.cwd(), 'server/images');


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


function saveImage(file) {
    const name = file.originalname
    const nameArray = name.split('.')
    const extension = nameArray[nameArray.length - 1]
    const uid = uuid.v4()
    const buffer = file.buffer
    const filepath = `${uid}.${extension}`
    fs.writeFileSync(`${imagesPath}/${filepath}`, buffer)
    return filepath
}

router.patch('/updateinfo', authMiddleware, upload.any([{name:'profilepicture',maxCount: 1},{name:'profilebanner',maxCount: 1}]), async (req, res, next) => {    
    const profilepicture = req.files.find(item => item.fieldname === 'profilepicture');
    const profilebanner = req.files.find(item => item.fieldname === 'profilebanner');
    const description = req.body.description

    let ppFilepath = null
    if (profilepicture) {
        try {
           ppFilepath = saveImage(profilepicture)
        } catch (e) {
            res.status(500).json(e);
            return; // otherwise will send multiple responses
        }
    } 

    let pbFilepath = null
    if (profilebanner) {
        try {
            pbFilepath = saveImage(profilebanner)
         } catch (e) {
             res.status(500).json(e);
             return; // otherwise will send multiple responses
         }
    }

    const userProfile = await UserProfile.findOne({where:{userid: req.user.id}})
    if (userProfile) {
        try {
            const updateObj = {}
            if (ppFilepath) updateObj['profilepicture'] = ppFilepath
            if (pbFilepath) updateObj['profilebanner'] = pbFilepath
            if (description) updateObj['description'] = description

            await userProfile.update(updateObj)
            res.status(200).json(userProfile);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).send()
    }
})


module.exports = router;