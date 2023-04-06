const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe')
const User = require('../models/User')

router.delete('/recipes/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const recipe = await Recipe.findByPk(id)
        recipe.destroy()
        res.send(`Deleted recipe with id ${id}`)
    } catch (err) {
        res.send(`Recipe with id ${id} not found`)
    }
})

router.delete('/recipes', async (req, res, next) => {
    Recipe.truncate()
    res.send('Deleted all recipes')
})

router.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)
        user.destroy()
        res.send(`Deleted user with id ${id}`)
    } catch (err) {
        res.send(`User with id ${id} not found`)
    }
})

router.delete('/users', async (req, res, next) => {
    User.truncate()
    res.send('Deleted all users')
})


router.patch('/permissions/:id', async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
        const user = await User.findByPk(id)

        if (body.permission) {
            user.update({permission: JSON.stringify(body.permission)})
        }
        res.send(`Updated permissions of user with id ${id}`)
    } catch (err) {
        res.send(`User with id ${id} not found`)
    }
})

module.exports = router