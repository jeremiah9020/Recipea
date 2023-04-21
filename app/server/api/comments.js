const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/auth');

// TODO:
// get all comments for the recipe id
router.get('/:id', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({where: {recipeid: req.params.id}});
        res.json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
})

// create a comment by a user for a recipe
// body should be {comment: string, recipeid: number}
router.post('/', authMiddleware, async (req, res, next) => {
    const userid = req.user.id;
    try {
        const comment = await Comment.create({
            comment: req.body.comment,
            userid: userid,
            recipeid: req.body.recipeid
        });
        res.status(200).json(comment);
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = router