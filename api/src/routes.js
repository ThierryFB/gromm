const express = require('express')
const router = express.Router()
const productRoutes = require('./product/product.routes')
const catalogRoutes = require('./catalog/catalog.routes')
const orderRoutes = require('./order/order.routes')

router.use('/catalogs/:address/orders', orderRoutes)
router.use('/catalogs/:address/products', productRoutes)
router.use('/catalogs', catalogRoutes)

module.exports = router
