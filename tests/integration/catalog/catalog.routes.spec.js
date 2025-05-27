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
This line `await hre.run('compile')` is using Hardhat (a development environment for Ethereum software) to compile smart contracts in the project.

When this command is executed, it:
1. Looks for all Solidity smart contract files in the project
2. Compiles them using the Solidity compiler (solc)
3. Generates the necessary artifacts (ABIs and bytecode) needed to interact with the contracts
4. Waits for the compilation to complete (due to the `await`)

This is typically necessary in tests that interact with smart contracts to ensure you're working with the latest version of the compiled contracts.

Would you like me to explain any specific aspect of this in more detail?
    const web3 = thorify(new Web3(), process.env.THOR_URL || 'http://localhost:8669')
    await waitForThor(web3)
  })

  describe('POST /api/catalogs', () => {
    it('should create a new catalog', async () => {
      const { inputs, expects } = testData.post.success

      const response = await request(app)
        .post(inputs.url)
        .send(inputs.body)
        .expect(200)

      expect(response.body).toEqual(expects.body)
    })
  })

  describe('GET /api/catalogs/:id', () => {
    it('should return a catalog by id', async () => {
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
