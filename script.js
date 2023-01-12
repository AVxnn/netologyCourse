const express = require('express');
require('dotenv').config();
const store = require('./store')
const loginRouter = require('./routes/login')
const error = require('./middleware/error')
const booksRouter = require('./routes/getBooks')
const bookRouter = require('./routes/getBook')
const createBookRouter = require('./routes/createBook')
const changeBookRouter = require('./routes/changeBook')
const deleteBook = require('./routes/deleteBook')
const downloadBook = require('./routes/downloadBook')
const logger = require('./middleware/logger')

const app = express()

app.use(logger)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user/login', loginRouter)
app.use('/api/books', booksRouter)
app.use('/api/books/', bookRouter)
app.use('/api/books/', createBookRouter)
app.use('/api/books/', changeBookRouter)
app.use('/api/books/', deleteBook)
app.use('/api/books/', downloadBook)

app.use(error)

const PORT = process.env.PORT || 3000;

app.listen(PORT)