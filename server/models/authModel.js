const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: /([a-z])\w+/
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  photo: {
    type: String,
    default: "https://wearelife.files.wordpress.com/2011/01/twitteregg.png"
  }
  password: {
    type: String,
    required: true,
  }
})

UserSchema.plugin(uniqueValidator, { message: '{PATH} {VALUE} already registered' });
const User = mongoose.model('User', UserSchema);

module.exports = User