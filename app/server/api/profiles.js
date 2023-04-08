const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const UserProfile = require('../models/UserProfile')

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const profile = await UserProfile.findByPk(id);

        if (profile !== null)
        {
            res.json(profile);
        }
    } catch(error) {
        res.status(500).json(error);
    }

    res.send(`failed to find user with id ${id}`);
})

module.exports = router;