const express = require('express')
const router = express.Router()
const Ck_out = require('../controllers/checkout')

router.get('/', Ck_out.getData)

router.post('/', Ck_out.checkout)

router.get('/:_id', Ck_out.getCheckout)

module.exports = router
