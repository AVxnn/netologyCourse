const express = require('express');
require('dotenv').config();
const loginRouter = require('./routes/login')
const error = require('./middleware/error')
const books = require('./routes/books')
const logger = require('./middleware/logger')

const mongoose = require('mongoose')

const req = require('express/lib/request');

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
  })
})

app.use('/api/user/login', loginRouter)
app.use('/api', books)
app.use(error)

async function start(PORT, UrlDB) {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(UrlDB);
  
    app.listen(PORT)
  } catch (e) {
      console.log(e)
  }
}
const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 3000;
console.log('server start Port', PORT);
start(PORT, UrlDB)