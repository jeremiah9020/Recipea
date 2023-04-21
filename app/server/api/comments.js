const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/auth');

// TODO:
// get all comments for the recipe id
router.get('/:id', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({where: {recipeid: req.params.id}, order: [['updatedAt', 'DESC']]});
        res.json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
})

// create a comment by a user for a recipe
// body should be {comment: string, recipeid: number}
router.post('/', authMiddleware, async (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
    const userid = req.user.id;
    const username = req.user.username;
    try {
        const comment = await Comment.create({
            comment: req.body.comment,
            userid: userid,
            username: username,
            recipeid: req.body.recipeid
        });
        console.log('successfully inserted into db');
        res.status(200).json(comment);
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router