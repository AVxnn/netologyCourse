const express = require('express');
require('dotenv').config();
const loginRouter = require('./routes/login')
const error = require('./middleware/error')
const books = require('./routes/books')
const logger = require('./middleware/logger')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose')

const verify = (username, password, done) => {
  db.users.findByUsername(username, (err, user) => {
    if (err) {return done(err)}
    if (!user) { return done(null, false) }

    if( !db.users.verifyPassword(user, password)) {
      return done(null, false)
    }

    return done(null, user)
  })
}

const options = {
  usernameField: "username",
  passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser( (id, cb) => {
  db.users.findById(id,  (err, user) => {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

const req = require('express/lib/request');
const db = require("./db");
const BookM = require("./models/book");

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded());

app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/user/login',
  passport.authenticate('local', { failureRedirect: '/api/user/login' }),
  (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/api/user/profile');
  })

app.post('/api/user/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/api/user/login',  (req, res) => {
  res.render('lib/login', { title: 'Login', user: req.user })
})

app.get('/api/user/profile',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/api/user/login')
    }
    next()
  },
  (req, res) => {
    res.render('lib/profile', { title: 'Profile', user: req.user })
  }
)

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  const books = await BookM.find().select('-__v')
  res.render('lib/index', {
    title: 'Главная',
    todos: books,
    user: req.user
  })
})

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