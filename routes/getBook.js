const store = require("../store");
const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
  const {books} = store
  const {id} = req.params
  console.log(req.params)
  const idx = books.findIndex(el => el.id === id)
  if (idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

module.exports = router