const store = require("../store");
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const {books} = store
  res.render("lib/index", {
    title: "Books",
    todos: books,
  });
})

module.exports = router