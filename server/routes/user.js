const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')
const userAuthor = require('../middlewares/userAuthor')

/* GET home page. */
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.put('/:id', auth, userAuthor, authController.edit)

module.exports = router;
