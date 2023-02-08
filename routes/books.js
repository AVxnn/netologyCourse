const store = require("../store");
const express = require('express');
const {v4: uuid} = require("uuid");
const uploadImg = require("../middleware/uploadImg");
const router = express.Router()

const BookM = require('../models/book');
const logger = require("../middleware/logger");

router.get('/books/:id', async (req, res) => {
  const {id} = req.params
  try {
    const book = await BookM.findById(id).select('-__v')
    console.log(book)
    const viewsUpdate = await BookM.findByIdAndUpdate(id, {
      views: +book.views + 1
    }).select('-__v')

    res.render("lib/view", {
      title: "ToDo | view",
      todo: book,
    });
  } catch (error) {
    res.status(404)
    res.json(`Такой идентификатор не найден, попробуйте другой.`)
  }
})

router.post('/counter/:id/incr', async (req, res) => {
  const {id} = req.params
  try {
    const book = await BookM.findById(id).select('-__v')
    const viewsUpdate = await BookM.findByIdAndUpdate(id, {
      views: +book.views + 1
    }).select('-__v')
    req.json(`Значение книги ${id}, увеличено на 1`)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/counter/:id', async (req, res) => {
  const {id} = req.params
  try {
    const book = await BookM.findById(id).select('-__v')
    res.json({message: `Значение книги ${id} - ${book.views}`})
  } catch (error) {
    res.status(500).json(error)
  }
})


router.get('/books', async (req, res) => {
  try {
    const books = await BookM.find().select('-__v')
    res.render("lib/index", {
      title: "Books",
      todos: books,
    });
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/book/create', uploadImg.single('fileBook'), (req, res) => {
  res.render("lib/create", {
    title: "ToDo | create",
    todo: {},
  });
})

router.post('/book/create', async (req, res) => {
  const {title, description, authors, favorite} = req.body

  let fileCover = '',
    fileName = '',
    fileBook = '';
  if (req.file) {
    fileBook = req.file.filename;
    fileCover = req.file.originalname.split('.')[0]
    fileName = `${Date.now()}-${req.file.originalname.split('.')[0]}`;
  }

  try {
    const book = new BookM({
      title: title,
      description: description,
      authors: authors,
      favorite: favorite,
      fileCover: fileCover,
      fileName: fileName,
      views: 0
    })

    await book.save();
    res.status(201)
    res.redirect('/api/books')
  } catch (error) {
    res.status(500).json(error)
  }
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

router.post('/books/delete/:id', async (req, res) => {
  const {id} = req.params
  const books = await BookM.deleteOne({_id: id})
  res.render("errors/404", {
    title: "OK - Book Deleted",
  });
})

router.get('/books/update/:id', async (req, res) => {
  const {id} = req.params
  try {
    const book = await BookM.findById(id).select('-__v')
    res.render("lib/update", {
      title: "ToDo | view",
      todo: book,
    });
  } catch (error) {
    res.status(404)
    res.json(`Такой идентификатор не найден, попробуйте другой.`)
  }
});

router.post('/books/update/:id', uploadImg.single('fileBook'), async (req, res) => {
  const {title = '', description = '', authors = '', favorite = ''} = req.body
  const {id} = req.params

  let fileCover = '',
    fileName = '',
    fileBook = '';
  if (req.file) {
    fileBook = req.file.filename;
    fileCover = req.file.originalname.split('.')[0]
    fileName = `${Date.now()}-${req.file.originalname.split('.')[0]}`;
  }
  const books = await BookM.findByIdAndUpdate({_id: id}, {
    title: title,
    description: description,
    authors: authors,
    favorite: favorite
  })
  res.redirect('/api/books')
})



module.exports = router