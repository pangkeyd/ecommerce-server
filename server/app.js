const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route

const signup = require('./routers/signup')
const signin = require('./routers/signin')
const item = require('./routers/item')
const ck_out = require('./routers/checkout')

app.use('/signup', signup)
app.use('/signin', signin)
app.use('/item', item)
app.use('/checkout', ck_out)

app.listen(process.env.PORT_DEF, () => {
  console.log('AYO JALAN!')
})
