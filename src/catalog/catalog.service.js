const { ethers } = require('hardhat')

const create = async ({ supplier, name }) => {
  // const network = await ethers.provider.getNetwork()
  // console.log("network:", network)
  const Catalog = await ethers.getContractFactory('Catalog')
  const catalogContract = await Catalog.deploy(supplier.name, name)
  return {
    address: catalogContract.address
  }
}

const getByAddress = async ({ address }) => {
  const Catalog = await ethers.getContractFactory('Catalog')
  const catalogContract = await Catalog.attach(address)
  return {
    address: catalogContract.address,
    name: await catalogContract.catalogName(),
    supplier: {
      name: await catalogContract.supplier()
    }
  }
}

module.exports = {
  create,
  getByAddress
}
