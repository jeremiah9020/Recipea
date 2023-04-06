const express = require('express')
const sequelize = require('./database')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api');

//DATABASE
sequelize.sync(
    //{force: true}
).then(()=> console.log('db is ready!'))

//APP
const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('trust proxy', 1)

// ROUTES
app.use('/auth', authRouter)
app.use('/api', apiRouter);

module.exports = app
