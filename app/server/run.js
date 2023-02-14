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

const usersRouter = require('./routes/Users')
app.use('/users', usersRouter)

app.listen(3000, ()=> console.log('Server Started'))
