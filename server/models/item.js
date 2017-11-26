const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const Schema = mongoose.Schema
const storage = require('@google-cloud/storage')

mongoose.connect(URI, { useMongoClient: true })

var item = new Schema({
  name: String,
  price: Number,
  image: String,
  author: String
})

var Item = mongoose.model('Item_p2r_eccomerce', item)

var gcs = storage({
  projectId: 'ecommerce-186813',
  keyFilename: 'keyfile.json'
})

function getItem(cb){
  Item.find({}, (err, item) => {
    if(err){
      res.status(200).send(err)
    }
    cb(item)
  })
}

function getItemById(params, cb){
  Item.find({
    _id: params._id
  }, (err, item) => {
    if(err){
      res.send(err)
      // console.log(err)
    }
    cb(item)
  })
}

function getItemByUser(params, cb){
  Item.find({
    author: params.author
  }, (err, item) => {
    if(err) res.send(err)
    cb(item)
  })
}

function saveItem(body, file, cb){
  let itemSchema = new Item({
    name: body.name,
    price: body.price,
    image: file.cloudStorageObject,
    author: body.author
  })
  itemSchema.save((err, item) => {
    if(err){
      res.status(200).send(err)
    }
    cb(item)
  })
}

function deleteItem(id, cb){
  Item.remove({
    _id: id
  }, (err) => {
    if(err){
      res.send(err)
    }
    let success = 'Success Delete!'
    cb(success)
  })
}

function updateItem(id, body, file, cb){
  if(file){
    Item.update({
      _id: id
    }, {
      $set: {
        name: body.name,
        price: body.price,
        image: file.cloudStorageObject,
        author: body.author
      }
    }, (err, item) => {
      if(!err){
        Item.find({
          _id: id
        }, (err, itemu) => {
          if(err) res.send(err)
          cb(itemu)
        })
      }
    })
  }else{
    Item.update({
      _id: id
    }, {
      $set: {
        name: body.name,
        price: body.price,
        author: body.author
      }
    }, (err, item) => {
      if(!err){
        Item.find({
          _id: id
        }, (err, itemu) => {
          if(err) res.send(err)
          cb(itemu)
        })
      }
    })
  }
}

module.exports = {
  getItem,
  getItemById,
  getItemByUser,
  saveItem,
  deleteItem,
  updateItem
}
