const express = require('express')
const router = express.Router()
const User = require('../controllers/signin')

router.get('/', User.getData)

router.post('/', User.signIn)

module.exports = router
