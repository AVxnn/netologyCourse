const store = require("../store");
const express = require('express')
const uploadImg = require("../middleware/uploadImg");
const router = express.Router()

router.put('/:id', uploadImg.single('fileBook'), (req, res) => {
  const {books} = store
  const {title = '', description = '', authors = '', favorite = ''} = req.body
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  let fileCover = '',
    fileName = '',
    fileBook = '';
  if (req.file) {
    fileBook = req.file.filename;
    console.log(fileBook);
    fileCover = req.file.originalname.split('.')[0]
    fileName = `${Date.now()}-${req.file.originalname.split('.')[0]}`;
  }
  if (idx !== -1){
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    }

    res.json(`Книга изменена`)
  } else {
    const example = books.map((i, index) => index < 2 ? i.id : '')
    res.status(404)
    res.json(
      `Такой идентификатор не найден, попробуйте другой. Вот пару рабочих id ${example}`)
  }
})

module.exports = router