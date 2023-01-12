const store = require("../store");
const express = require('express')
const {v4: uuid} = require("uuid");
const router = express.Router()
const uploadImg = require('../middleware/uploadImg')

class Book {
  constructor(title = '',
              description = '',
              authors = '',
              favorite = '',
              fileCover = '',
              fileName = '',
              fileBook = '',
              id = uuid()) {
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.fileBook = fileBook
    this.id = id
  }
}

router.post('/', uploadImg.single('fileBook') ,(req, res) => {
  const {books} = store
  let fileCover = '',
    fileName = '',
    fileBook = '';
  if (req.file) {
    fileBook = req.file.filename;
    fileCover = req.file.originalname.split('.')[0]
    fileName = `${Date.now()}-${req.file.originalname.split('.')[0]}`;
  }
  const {title, description, authors, favorite} = req.body
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
  books.push(newBook)
  res.status(201)
  res.json(newBook)
})

module.exports = router