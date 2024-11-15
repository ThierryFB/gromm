const express = require('express')
const router = express.Router()
const catalogController = require('./catalog.controller')

// Create a new catalog
router.post('/', catalogController.create)

// Get a cataloge by address
router.get('/:address', catalogController.getByAddress)

module.exports = router
