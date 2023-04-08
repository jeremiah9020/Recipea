const express = require('express')
const sequelize = require('./database')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api');

//DATABASE
sequelize.sync(
    // {force: true}
).then(()=> console.log('db is ready!'))

//APP
const app = express()
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.set('trust proxy', 1)

// ROUTES
app.use('/auth', authRouter)
app.use('/api', apiRouter);

module.exports = app
