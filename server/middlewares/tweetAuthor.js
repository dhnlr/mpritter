const Tweet = require('../models/tweetModel.js')

module.exports = (req, res, next) =>{
	Tweet.findOne({'_id': req.params.id})
	.then(tweet=>{
		if (req.decoded && tweet.author == req.decoded.userId) {
			next()
		}
		else {
			res.status(403).json({
				message: 'User not authorize'
			})
		}
	})
}