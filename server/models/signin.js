const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./signup')

mongoose.connect(URI, { useMongoClient: true })

function getUser(cb){
  User.User.find({}, (err, user) => {
    if(err){
      res.send(err)
    }
    cb(user)
  })
}

function signIn(body, cb){
  let query = {
    $or: [
      { email: body.email },
      { username: body.username }
    ]
  }
  User.User.find(query, (err, user) => {
    if(err) res.send(err)
    if(user.length > 0){
      let resPass = bcrypt.compareSync(body.password, user[0].password)
      if(resPass){
        let obj = {
          id: user[0]._id,
          username: user[0].username
        }
        let token = jwt.sign(obj, process.env.SECRET_KEY)
        cb(token, null)
      }else{
        let wrong = 'Wrong Username or Password!'
        cb(null, wrong)
      }
    }else{
      let wrong = 'Wrong Username or Password!'
      cb(null, wrong)
    }
  })
}

module.exports = {
  getUser,
  signIn
}
