const { asyncAction } = require('../utils')
const productService = require('./product.service')

exports.getBySku = asyncAction(async (req, res) => {
  const { sku, address: catalogAddress } = req.params
  const product = await productService.getBySku({ sku, catalogAddress })
  res.json(product)
})

exports.put = asyncAction(async (req, res) => {
  const { sku, address: catalogAddress } = req.params
  const { name, price, description, unitOfMeasure } = req.body
  const product = await productService.upsert({ catalogAddress, product: { sku, name, price, description, unitOfMeasure } })
  res.json(product)
})
