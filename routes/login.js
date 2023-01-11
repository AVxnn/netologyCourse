const store = require('../store')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const {user} = store
  res.status(201)
  res.json(user)
})

module.exports = router