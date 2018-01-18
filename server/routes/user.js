const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')
const userAuthor = require('../middlewares/userAuthor')
const images = require('../middlewares/images')

/* GET home page. */
router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);
router.put('/:id', auth, userAuthor, images.multer.single('images'), images.uploadCloudinari, userController.updateUser)

module.exports = router;
