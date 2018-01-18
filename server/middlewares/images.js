'use strict'
require('dotenv').config()
var cloudinary = require('cloudinary').v2;

const uploadCloudinari = (req, res, next) => {
  console.log(req.file)
  if (!req.file) {
    return next()
  }
  cloudinary.uploader.upload_stream( {folder: "mpritter/"}, (error, result) => {
    req.photolink = result.url
    console.log(req.photolink, '>>>>')
    next()
  })
  .end( req.file.buffer )
}

const Multer = require('multer')
const multer = Multer({
  storage: Multer.MemoryStorage
})

module.exports = {
  uploadCloudinari,
  multer
}