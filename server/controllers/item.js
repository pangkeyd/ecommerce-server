const item = require('../models/item')

class Item {

  static auth(req, res, next){
    if(req.headers.token){
      return next()
    }
    let failed = 'Login Dulu!'
    res.send(failed)
  }

  static getData(req, res){
    item.getItem(result => {
      res.send(result)
    })
  }

  static getDataById(req, res){
    item.getItemById(req.params, (result) => {
      res.send(result)
    })
  }

  static getDataByUser(req, res){
    item.getItemByUser(req.params, (result) => {
      res.send(result)
    })
  }

  static saveData(req, res){
    item.saveItem(req.body, req.file, (result) => {
      res.send(result)
    })
  }

  static deleteData(req, res){
    item.deleteItem(req.params._id, (result) => {
      res.send(result)
    })
  }

  static updateData(req, res){
    item.updateItem(req.params._id, req.body, req.file, (result) => {
      res.send(result)
    })
  }

}

module.exports = Item
