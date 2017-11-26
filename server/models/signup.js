const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const bcrypt = require('bcrypt')
const saltRounds = 8
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

mongoose.connect(URI, { useMongoClient: true })

var user = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  salt: String
})

var User = mongoose.model('User_p2r_eccomerce', user)

function getUser(cb){
  User.find({}, (err, user) => {
    if(err){
      res.send(err)
    }
    cb(user)
  })
}

function uniqueEmail(params, cb){
  User.find({
    email: params.email
  }, (err, user) => {
    if(err) res.send(err)
    cb(user)
  })
}

function uniqueUser(params, cb){
  User.find({
    username: params.username
  }, (err, user) => {
    if(err) res.send(err)
    cb(user)
  })
}

function saveUser(body, cb){
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.password, salt, (err, hash) => {
      let userSchema = new User({
        email: body.email,
        username: body.username,
        password: hash,
        salt: hash
      })
      userSchema.save((err, user) => {
        if(!err){
          cb(user, null)
        }else{
          if(err.message.indexOf('email_1') !== -1){
            let errorEmail = `Email '${body.email}' already used!`
            cb(null, errorEmail)
          }else if(err.message.indexOf('username_1') !== -1){
            let errorUser = `Username '${body.username}' already used!`
            cb(null, errorUser)
          }
        }
      })
    })
  })
}

module.exports = {
  User,
  getUser,
  uniqueEmail,
  uniqueUser,
  saveUser
}
