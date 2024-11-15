const request = require('supertest')
const app = require('../../../src/index')
const { thorify } = require('thorify')
const Web3 = require('web3')
const mockDate = require('mockdate')
const { waitForThor } = require('../../utils')
const hre = require('hardhat')
const catalogService = require('../../../src/catalog/catalog.service')

const testData = require('./catalog.routes.data')

describe('Catalog Routes', () => {
  beforeAll(async () => {
    mockDate.set('2024-07-09T00:17:00.000Z')
    await hre.network.provider.send('evm_setNextBlockTimestamp', [new Date('2033-05-18T03:33:00.000Z').getTime() / 1000])
    await hre.run('compile')
    const web3 = thorify(new Web3(), process.env.THOR_URL || 'http://localhost:8669')
    await waitForThor(web3)
  })

  describe('POST /api/catalogs', () => {
    it('should create a new product', async () => {
      const { inputs, expects } = testData.post.success

      const response = await request(app)
        .post(inputs.url)
        .send(inputs.body)
        .expect(200)

      expect(response.body).toEqual(expects.body)
    })
  })

  describe('GET /api/catalogs/:id', () => {
    it('should return a product by id', async () => {
      const { inputs, expects, inserts } = testData.getByAddress.success

      await catalogService.create(inserts.catalog)

      const response = await request(app)
        .get(inputs.url)

      if (response.error) console.debug('response: ', response.error)

      expect(response.status).toBe(expects.status)
      expect(response.body).toEqual(expects.body)
    })
  })
})
