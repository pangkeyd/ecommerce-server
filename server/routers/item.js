const express = require('express')
const router = express.Router()
const Item = require('../controllers/item')
const file = require('../lib/file')

router.get('/', Item.getData)

router.get('/:_id', Item.getDataById)

router.get('/user/:author', Item.auth,  Item.getDataByUser)

router.post('/', Item.auth, file.multer.single('image'), file.sendUploadToGCS, Item.saveData)

router.delete('/:_id', Item.auth, Item.deleteData)

router.put('/update/:_id', Item.auth, file.multer.single('image'), file.sendUploadToGCS, Item.updateData)

module.exports = router
