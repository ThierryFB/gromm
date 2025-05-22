const request = require('supertest')
const app = require('../../../src/index')
const { thorify } = require('thorify')
const Web3 = require('web3')
const mockDate = require('mockdate')
const { waitForThor } = require('../../utils')
const hre = require('hardhat')
const catalogService = require('../../../src/catalog/catalog.service')
const productService = require('../../../src/product/product.service')
const orderService = require('../../../src/order/order.service')

const testData = require('./order.routes.data')
let catalogAddress

describe('Order Routes', () => {
  beforeAll(async () => {
    mockDate.set('2024-07-09T00:17:00.000Z')
    await hre.network.provider.send('evm_setNextBlockTimestamp', [new Date('2033-05-18T03:33:00.000Z').getTime() / 1000])
    await hre.run('compile')
    const web3 = thorify(new Web3(), process.env.THOR_URL || 'http://localhost:8669')
    await waitForThor(web3)
    ;({ address: catalogAddress } = await catalogService.create(testData.beforeAll.inserts.catalog))
  })

  describe('POST /api/catalogs/:address/orders', () => {
    it('should create a new product', async () => {
      const { inputs, expects, inserts } = testData.post.success
      for (const product of inserts.products) {
        await productService.upsert({ catalogAddress, product })
      }
      const response = await request(app)
        .post(inputs.getUrl(catalogAddress))
        .send(inputs.body)
      if (response.error) console.debug('error: ', response.error)
      expect(response.status).toBe(expects.status)
      expect(response.body).toMatchObject(expects.body)
    })
  })

  describe('GET /api/catalogs/:address/orders/:orderNumber', () => {
    it('should return a product by id', async () => {
      const { inputs, expects, inserts } = testData.getByOrderNumber.success

      for (const product of inserts.products) {
        await productService.upsert({ catalogAddress, product })
      }

      await orderService.insert({ catalogAddress, order: inserts.order })

      const response = await request(app)
        .get(inputs.getUrl(catalogAddress))

      if (response.error) console.debug('error: ', response.error)

      expect(response.status).toBe(expects.status)
      expect(response.body).toMatchObject(expects.body)
    })
  })
})
