const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const {user} = {name: 'user', id: '1'}
  res.status(201)
  res.json(user)
})

module.exports = router