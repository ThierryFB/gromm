const { ethers } = require('hardhat')
const { cleanStruct } = require('../utils')

const upsert = async ({ catalogAddress, product }) => {
  const Catalog = await ethers.getContractFactory('Catalog')
  const catalogContract = await Catalog.attach(catalogAddress)
  catalogContract.createProduct(product.name, product.price, product.description, product.unitOfMeasure, product.sku)
  const upsertedProduct = await catalogContract.skuToProduct(product.sku)
  return cleanStruct({ solidityObject: upsertedProduct })
}

const getBySku = async ({ sku, catalogAddress }) => {
  const Catalog = await ethers.getContractFactory('Catalog')
  const catalogContract = await Catalog.attach(catalogAddress)
  const product = await catalogContract.skuToProduct(sku)
  return cleanStruct({ solidityObject: product })
}

module.exports = {
  upsert,
  getBySku
}
