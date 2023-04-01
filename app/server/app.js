const express = require('express')
const sequelize = require('./database')
const cors = require('cors')

const authRouter = require('./routes/auth')
const testingRouter = require('./routes/testing_endpoint')

//DATABASE
sequelize.sync(
    //{force: true}
).then(()=> console.log('db is ready!'))

//APP
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('trust proxy', 1)

// ROUTES
app.use('/auth', authRouter)
app.use('/testing', testingRouter)

module.exports = app
