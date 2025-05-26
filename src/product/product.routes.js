const express = require('express')
const router = express.Router({ mergeParams: true })
const productController = require('./product.controller')

// Get a product by ID
router.get('/:sku', productController.getBySku)

// Update a product
router.put('/:sku', productController.put)

module.exports = router
