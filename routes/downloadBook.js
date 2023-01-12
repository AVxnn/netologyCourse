const express = require('express')
const store = require("../store");
const router = express.Router()

router.get('/:id/download', (req, res) => {
  const {books} = store
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  if (idx !== -1) {
    const {fileBook, fileCover} = books[idx]
    if (fileBook.length > 2) {
      const extension = fileBook.split('.').pop();
      res.download(__dirname+`/../public/img/${fileBook}`, `${fileCover}.${extension}`, err=>{
        if (err) {
          res.status(404).json();
        }
      });
      res.status(201)
    } else {
      res.status(404)
      res.json('В выбранной книге нет изображения')
    }
  } else {
    const example = books.map((i, index) => index < 2 ? i.id : '')
    res.status(404)
    res.json(
      `Такой идентификатор не найден, попробуйте другой. Вот пару рабочих id ${example}`)
  }
})

module.exports = router