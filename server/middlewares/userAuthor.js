const User = require('../models/userModel.js')

module.exports = (req, res, next) =>{
  User.findOne({'_id': req.params.id})
  .then(user=>{
    if (req.decoded && user._id == req.decoded.userId) {
      next()
    }
    else {
      res.status(403).json({
        message: 'User not authorize'
      })
    }
  })
}