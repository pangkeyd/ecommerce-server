const ck_out = require('../models/checkout')

class Ck_out {

  static getData(req, res){
    ck_out.getCart(result => {
      res.send(result)
    })
  }

  static checkout(req, res){
    ck_out.checkout(req.body, (result) => {
      res.send(result)
    })
  }

  static getCheckout(req, res){
    ck_out.getCheckout(req.params._id, (result) => {
      res.send(result)
    })
  }

}

module.exports = Ck_out
