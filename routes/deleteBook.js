const express = require('express')
const router = express.Router()

router.delete('/:id', (req, res) => {
  const store = require("../store");
  const {books} = store
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  if (idx !== -1) {
    books.splice(idx, 1)
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }

})

module.exports = router