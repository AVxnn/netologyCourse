const {v4: uuid} = require("uuid");
const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string",
  views: "string"
})

module.exports = model('BookM', bookSchema)