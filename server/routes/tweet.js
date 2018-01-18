const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController')
const auth = require('../middlewares/auth')
const tweetAuthor = require('../middlewares/tweetAuthor')

/* GET users listing. */
router.get('/', auth, tweetController.read);
router.get('/search', auth, tweetController.readHashtag);
router.post('/', auth, tweetController.create);
router.put('/:id', auth, tweetController.update);
router.delete('/:id', auth, tweetController.destroy);

module.exports = router;
