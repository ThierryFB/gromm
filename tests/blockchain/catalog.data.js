const { ethers } = require('hardhat')

const existingProduct = [
  'Product 2',
  102,
  'Description 2',
  'Unit 1',
  'sku_existing'
]

const newProduct = [
  'Product 1',
  100,
  'Description 1',
  'Unit 1',
  'sku1'
]

const newOrder = [
  [
    {
      sku: 'sku1',
      quantity: 1
    }
  ]
]

exports.createProduct = {
  success: {
    expects: {
      product:
        {
          catalogAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          name: 'Product 1',
          price: ethers.BigNumber.from(100),
          description: 'Description 1',
          unitOfMeasure: 'Unit 1',
          sku: 'sku1'
        },
      price: 100
    },
    inputs: {
      addProduct: newProduct
    }
  }
}

exports.getProduct = {
  success: {
    inserts: {
      product: existingProduct
    },
    expects: {
      product: {
        name: 'Product 2',
        price: ethers.BigNumber.from(102),
        description: 'Description 2',
        unitOfMeasure: 'Unit 1',
        sku: 'sku_existing'
      },
      price: 102
    },
    inputs: {
      getProduct: 2
    }
  }
}

exports.getCatalog = {
  success: {
    inserts: {
      catalog: [
        'Supplier 2',
        'Catalog 2'
      ]
    },
    expects: {
      catalogName: 'Catalog 2'
    }
  }
}

exports.createOrder = {
  success: {
    expects: {
      order:
        {
          date: ethers.BigNumber.from(new Date('2033-05-18T03:33:08.000Z').getTime() / 1000),
          orderNumber: ethers.BigNumber.from(1)
        },
      orderGotByOrderNumber: {
        date: ethers.BigNumber.from(new Date('2033-05-18T03:33:08.000Z').getTime() / 1000),
        orderNumber: ethers.BigNumber.from(1),
        items: [
          {
            sku: 'sku1',
            quantity: ethers.BigNumber.from(1)
          }
        ]
      }
    },
    inputs: {
      createOrder: newOrder
    }
  }
}
