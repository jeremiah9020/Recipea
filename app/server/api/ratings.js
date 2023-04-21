const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const authMiddleware = require('../middleware/auth');

// TODO:

// get all ratings for the recipe id
router.get('/:id', authMiddleware, async (req, res, next) => {
    const userid = req.user.id;
    console.log(userid, req.params.id)
    try {
        const ratings = await Rating.findOne({where: {userid: userid, recipeid: req.params.id}});
        res.json(ratings);
    } catch (error) {
        res.status(500).json(error);
    }
})

// create a rating by a user for a recipe
// body should be {score: number, recipeid: number}
router.post('/', authMiddleware, async (req, res, next) => {
    const userid = req.user.id;

    try {
        // get rating
        let rating = await Rating.findOne({where: {userid: userid, recipeid: req.body.recipeid}});

        // if rating does not exist create a new one
        if (rating)
        {
            rating.set({
                score: req.body.score,
                userid: userid,
                recipeid: req.body.recipeid
            })
            await rating.save();
        }
        // if rating exists, update it
        else 
        {

            rating = await Rating.create({
                score: req.body.score,
                userid: userid,
                recipeid: req.body.recipeid
            });
        }
        res.status(200).json(rating);
    } catch(error) {

        res.status(500).json(error);
    }
})

module.exports = router;