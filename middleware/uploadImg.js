const multer = require('multer')
const path = require('path')

const uploadDir = path.resolve(__dirname, '../public/img');

const storage = multer.diskStorage({
  destination(req, file, cb){
    cb(null, uploadDir)
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

module.exports = multer({storage})