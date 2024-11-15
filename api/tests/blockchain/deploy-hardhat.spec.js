const { thorify } = require('thorify')
const Web3 = require('web3')
const mockDate = require('mockdate')
const { waitForThor } = require('../utils')
// const { deploy } = require('../../blockchain/deploy')
const hre = require('hardhat')
const testData = require('./deploy-hardhat.data')

describe('Contract Deployment', () => {
  let web3
  let catalogContract
  let Catalog

  beforeAll(async () => {
    mockDate.set('2024-07-09T00:17:00.000Z')
    await hre.network.provider.send('evm_setNextBlockTimestamp', [new Date('2033-05-18T03:33:00.000Z').getTime() / 1000])
    // await hre.network.provider.send('evm_mine')
    await hre.run('compile')
    web3 = thorify(new Web3(), process.env.THOR_URL || 'http://localhost:8669')
    await waitForThor(web3)
    Catalog = await hre.ethers.getContractFactory('Catalog')
    catalogContract = await Catalog.deploy('Supplier 1', 'Catalog 1')
    console.debug('first address: ', catalogContract.address)
    console.debug('owner: ', await catalogContract.owner())
  }, 60000)

  beforeEach(async () => {
  })
  afterEach(async () => {
    await catalogContract.deleteAllProducts()
  })
  it('should deploy the product contract successfully', async () => {
    expect(catalogContract.functions.createProduct).toBeDefined()
  }, 60000)

  it('should create a product successfully', async () => {
    const { expects, inputs } = testData.createProduct.success
    await catalogContract.createProduct(...inputs.addProduct)
    const product = await catalogContract.products(0)
    console.debug('product: ', product)
    expect(product).toMatchObject(expects.product)
  }, 60000)

  it('should retrieve existing product from its sku successfully', async () => {
    const { expects, inserts } = testData.getProduct.success

    await catalogContract.createProduct(...inserts.product)

    const product = await catalogContract.getProductBySku('sku_existing')
    expect(product).toMatchObject(expects.product)
  }, 60000)

  it('should have retrieve catalog with address', async () => {
    const { expects, inserts } = testData.getCatalog.success
    const newCatalogContract = await Catalog.deploy(...inserts.catalog)
    console.debug('newCatalogContract: ', newCatalogContract.address)
    const retrivedCatalog = await Catalog.attach(newCatalogContract.address)
    expect(await retrivedCatalog.catalogName()).toBe(expects.catalogName)
  }, 60000)

  it('should create an order successfully', async () => {
    const { expects, inputs } = testData.createOrder.success
    await catalogContract.createOrder(...inputs.createOrder)
    const order = await catalogContract.orders(0)
    // console.debug('order: ', order)
    // console.debug('expects: ', expects.order)
    // console.debug(new Date('2033-05-18T03:33:28.000Z').getTime() / 1000)
    // console.debug('date: ', new Date(order.date.toNumber() * 1000).toISOString())
    expect(order).toMatchObject(expects.order)

    const orderGotByOrderNumber = await catalogContract.getOrderByOrderNumber(1)
    expect(orderGotByOrderNumber).toMatchObject(expects.orderGotByOrderNumber)
  }, 60000)
})
