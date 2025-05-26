const express = require('express')
const router = express.Router({ mergeParams: true })
const orderController = require('./order.controller')

router.get('/:orderNumber', orderController.getByOrderNumber)

router.post('/', orderController.post)

module.exports = router
