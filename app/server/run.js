require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

const testRouter = require('./routes/testing_endpoint')
app.use('/endpoint', testRouter)

app.listen(3000, ()=> console.log('Server Started'))
