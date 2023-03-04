const express = require('express')
const router = express.Router()

router.get('/api/user/login', (req, res) => {
  const user = {name: 'user', id: '1'}
  console.log(user)
  res.status(201)
  res.render("lib/login", {
    title: "Login",
    user: user
  });
})

router.get('/api/user/profile', (req, res) => {
  const user = {name: 'user', id: '1'}
  console.log(user)
  res.status(201)
  res.render("lib/profile", {
    title: "Profile",
    user: user
  });
})

module.exports = router