const express = require('express');
require('dotenv').config();
const store = require('./store')
const loginRouter = require('./routes/login')
const error = require('./middleware/error')
const books = require('./routes/books')
const logger = require('./middleware/logger')

const app = express()

app.use(logger)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
  })
})

app.use('/api/user/login', loginRouter)
app.use('/api', books)

app.use(error)

const PORT = process.env.PORT || 3000;

app.listen(PORT)