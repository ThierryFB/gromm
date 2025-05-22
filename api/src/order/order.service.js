const { ethers } = require('hardhat')
const { cleanStruct } = require('../utils')

const insert = async ({ catalogAddress, order }) => {
  const Catalog = await ethers.getContractFactory('Catalog')
  const catalogContract = await Catalog.attach(catalogAddress)
  const transaction = await catalogContract.createOrder(order.items)
  return transaction
}

const getByOrderNumber = async ({ orderNumber, catalogAddress }) => {
  const Catalog = await ethers.getContractFactory('Catalog')
  const catalogContract = await Catalog.attach(catalogAddress)
  const order = await catalogContract.orderNumberToOrder(orderNumber)
  console.debug('order', order)
  return cleanStruct({ solidityObject: order, decimals: 0 })
}

module.exports = {
  insert,
  getByOrderNumber
}
