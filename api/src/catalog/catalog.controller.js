const { asyncAction } = require('../utils')
const catalogService = require('./catalog.service')

exports.create = asyncAction(async (req, res) => {
  const { supplier, name } = req.body
  const catalog = await catalogService.create({ supplier, name })
  res.json(catalog)
})

exports.getByAddress = asyncAction(async (req, res) => {
  const { address } = req.params
  const catalogs = await catalogService.getByAddress({ address })
  res.json({ catalogs })
})
