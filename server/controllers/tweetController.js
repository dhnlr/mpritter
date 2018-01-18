const Tweet = require('../models/tweetModel')

class TweetController {
  static create (req, res) {
    let newTweet = {
      post: req.body.post,
      author: req.decoded.userId,
      hashtag: req.body.hashtag
    }
    console.log(newTweet)
    Tweet.create(newTweet)
      .then( data => {
        res.status(200).json({
          message: 'Success',
          data: data
        })
      })
      .catch( error => {
        res.status(400).json({
          message: 'Error',
          error : error
        })
      })
  }
  static read (req, res) {
    Tweet.find().populate('author').exec()
    .then( tweets => {
      res.status(200).json({
        message: 'Success',
        data : tweets
      })
    })
    .catch (error=>{
      res.status(400).json({
        message: 'Error',
        error: error
      })
    })
  }
  static readId (req, res){
    Tweet.findOne({'_id': req.params.id}).populate('author').exec()
      .then( tweet => {
        res.status(200).json({
          message: 'Success',
          data: tweet
        })
      })
      .catch(error=>{
        res.status(400).json({
          message: 'Error',
          error: error
        })
      })
  }
  static readHashtag (req, res) {
    console.log('Masuk', req.body.hashtag)
    Tweet.find({'hashtag': { '$in': [req.body.hashtag]}}).populate('author').exec()
      .then(tweet => {
        console.log(tweet, '<<<')
          res.status(200).json({
          message: 'Success',
          data: tweet
        })
      })
      .catch(error=>{
        console.log(error)
        res.status(400).json({
          message: 'Error',
          error: error
        })
      })
  }
  static update (req, res){
    Tweet.findOne({'_id': req.params.id})
    .then( tweet => {
      let updateTweet = {
        post: req.body.post || tweet.post,
        hashtag: req.body.hashtag|| tweet.hashtag
      }
      Tweet.findOneAndUpdate({'_id': req.params.id}, {$set: updateTweet}, {upsert: true, new : true})
      .then(data=>{
        res.status(200).json({
          message: 'Success',
          data: data
        })
      })
      .catch(error=>{
        res.status(200).json({
          message: 'Error',
          error: error
        })
      })
    })
  }
  static destroy (req, res){
    Tweet.remove({'_id': req.params.id})
    .then(data=>{
      res.status(200).json({
        messsage: 'Success',
        data: data
      })
    })
    .catch(error=>{
      res.status(200).json({
        message: 'Error',
        error: error
      })
    })
  }
}

module.exports = TweetController
