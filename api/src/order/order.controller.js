const { asyncAction } = require('../utils')
const orderService = require('./order.service')

exports.getByOrderNumber = asyncAction(async (req, res) => {
  const { orderNumber, address: catalogAddress } = req.params
  const order = await orderService.getByOrderNumber({ orderNumber, catalogAddress })
  res.json(order)
})

exports.post = asyncAction(async (req, res) => {
  const { address: catalogAddress } = req.params
  const { items } = req.body
  const { hash } = await orderService.insert({ catalogAddress, order: { items } })
  res.json({ hash })
})
