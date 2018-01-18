const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  post: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: /([a-z])\w+/
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  hashtag: [{
      type: String
  }]
})

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet