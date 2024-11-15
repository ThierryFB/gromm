const express = require('express')
const router = express.Router()
const productRoutes = require('./product/product.routes')
const catalogRoutes = require('./catalog/catalog.routes')

router.use('/catalogs/:address/products', productRoutes)
router.use('/catalogs', catalogRoutes)

module.exports = router
