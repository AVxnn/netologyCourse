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
    const example = books.map((i, index) => index < 2 ? i.id : '')
    res.status(404)
    res.json(
      `Такой идентификатор не найден, попробуйте другой. Вот пару рабочих id ${example}`)
  }

})

module.exports = router