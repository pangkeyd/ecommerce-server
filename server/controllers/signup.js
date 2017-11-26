const user = require('../models/signup')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

  static getEmail(req, res){
    user.uniqueEmail(req.params, (result) => {
      res.send(result)
    })
  }

  static getUsername(req, res){
    user.uniqueUser(req.params, (result) => {
      res.send(result)
    })
  }

  static saveData(req, res){
    user.saveUser(req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = User
