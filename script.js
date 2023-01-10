const express = require('express');
const { v4: uuid } = require('uuid')

class Book {
  constructor(title = '',
              description = '',
              authors = '',
              favorite = '',
              fileCover = '',
              fileName = '',
              id = uuid()) {
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.id = id
  }
}

const store = {
  user: {
    id: 1,
    mail: 'test@mail.ru'
  },
  books: [
    {
      id: "1",
      title: "Торадора!",
      description: "とらドラ",
      authors: "\tЮюко Такэмия",
      favorite: "vxnn",
      fileCover: "test",
      fileName: "test"
    }
  ],
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/user/login', (req, res) => {
  const {user} = store
  res.json(user)
})

app.get('/api/books', (req, res) => {
  const {books} = store
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const {books} = store
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  if (idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.post('/api/books', (req, res) => {
  const {books} = store
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  books.push(newBook)
  res.status(201)
  res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const {books} = store
  const {title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = ''} = req.body
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx !== -1){
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    }

    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

app.delete('/api/books/:id', (req, res) => {
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

app.listen(3000)