const mongoose = require('mongoose')
const URI = process.env.DB_NAME
const Schema = mongoose.Schema

mongoose.connect(URI, { useMongoClient: true })

var ck_out = new Schema({
  itemID: [
    {type: Schema.Types.ObjectId, ref: 'Item'}
  ],
  total_price: Number
})

var Ck_out = mongoose.model('Checkout', ck_out)

function getCart(cb){
  Ck_out.find()
  .populate('itemID')
  .exec((err, ck_out) => {
    if(err){
      res.status(200).send(err)
    }
    cb(ck_out)
  })
}

function checkout(body, cb){
  if(body.item){
    let item = body.item.split(',')
    if(item.length > 1){
      let ck_outSchema = new Ck_out({
        itemID: item,
        total_price: body.total
      })
      ck_outSchema.save((err, ck_out) => {
        if(err){
          res.status(200).send(err)
        }
        cb(ck_out)
      })
    }else{
      let ck_outSchema = new Ck_out({
        itemID: body.item,
        total_price: body.total
      })
      ck_outSchema.save((err, ck_out) => {
        if(err){
          res.status(200).send(err)
        }
        cb(ck_out)
      })
    }
  }
}

function getCheckout(id, cb){
  Ck_out.find({
    _id: id
  })
  .populate('itemID')
  .exec((err, ck) => {
    if(err){
      res.status(200).send(err)
    }
    cb(ck)
  })
}

module.exports = {
  getCart,
  checkout,
  getCheckout
}
