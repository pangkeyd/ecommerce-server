const user = require('../models/signin')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

  static signIn(req, res){
    user.signIn(req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = User
