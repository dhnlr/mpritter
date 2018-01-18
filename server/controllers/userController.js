const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static signIn(req, res){
    User.find({'username': req.body.username})
    .then(user => {
      if (user.length == 0) {
        res.status(404).json({
          message: 'User not found',
        })
      }
      if (bcrypt.compareSync(req.body.password, user[0].password)) {
        let payload = {
          userId: user[0]._id,
          username : user[0].username,
          email : user[0].email
        }
        jwt.sign(payload, process.env.SECRET_KEY, (error, token)=>{
          if (error) {
            res.status(403).json({message: 'User and password wrong', error: error})
          } else {
            res.status(200).json({
              message: 'Success',
              token: token,
              userId : user[0]._id,
              username: user[0].username,
              photo: user[0].photo,
              email: user[0].email
            })
          }
        })
      }
    })
  }
  static signUp(req,res){
    let data = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    }
    User.create(data)
    .then(user => {
      res.status(200).json({
          message: 'Success',
          data: data,
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
          message: 'Error',
          error: error
        })
    })
  }
  static updateUser(req,res){
    User.find({'_id': req.params.id})
    .then(user => {
      console.log(req.photolink)
      let updateUser = {
        email: req.body.email || user[0].email,
        photo: req.photolink || user[0].photo,
      }
      User.findOneAndUpdate({'_id': req.params.id}, {$set: updateUser}, {upsert: true, new : true})
      .then((data)=>{
        res.status(200).json({
            message: 'Success',
            data: updateUser,
          })
      })
      .catch(error=> {
        res.status(400).json({
            message: 'Error',
            data: error
          })
      })
    })
  }
}

module.exports = UserController;