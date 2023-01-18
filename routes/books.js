const store = require("../store");
const express = require('express')
const {v4: uuid} = require("uuid");
const uploadImg = require("../middleware/uploadImg");
const router = express.Router()


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


router.get('/books/:id', (req, res) => {
  const {books} = store
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  if (idx !== -1) {
    res.render("lib/view", {
      title: "ToDo | view",
      todo: books[idx],
    });
  } else {
    const example = books.map((i, index) => index < 2 ? i.id : '')
    res.status(404)
    res.json(
      `Такой идентификатор не найден, попробуйте другой. Вот пару рабочих id ${example}`)
  }
})


router.get('/books', (req, res) => {
  const {books} = store
  res.render("lib/index", {
    title: "Books",
    todos: books,
  });
})

router.get('/book/create', uploadImg.single('fileBook'), (req, res) => {
  res.render("lib/create", {
    title: "ToDo | create",
    todo: {},
  });
})

router.post('/book/create', uploadImg.single('fileBook') ,(req, res) => {
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
})


router.get('/books/:id/download', (req, res) => {
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

router.post('/books/delete/:id', (req, res) => {
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

router.get('/books/delete/:id', uploadImg.single('fileBook'), (req, res) => {
  const {books} = store
  res.render("lib/index", {
    title: "Books",
    todos: books,
  });
})

router.get('/books/update/:id', (req, res) => {
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
    res.render("lib/update", {
      title: "ToDo | view",
      todo: books[idx],
    });

  } else {
    const example = books.map((i, index) => index < 2 ? i.id : '')
    res.status(404)
    res.json(
      `Такой идентификатор не найден, попробуйте другой. Вот пару рабочих id ${example}`)
  }
});

router.post('/books/update/:id', uploadImg.single('fileBook'), (req, res) => {
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

  } else {
    const example = books.map((i, index) => index < 2 ? i.id : '')
    res.status(404)
    res.json(
      `Такой идентификатор не найден, попробуйте другой. Вот пару рабочих id ${example}`)
  }
})



module.exports = router