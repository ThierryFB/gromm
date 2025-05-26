const products = [{
  name: 'Apple',
  price: 199,
  description: 'A delicious apple',
  unitOfMeasure: 'kg',
  sku: 'apple-sku'
},
{
  name: 'Pear',
  price: 299,
  description: 'A delicious pear',
  unitOfMeasure: 'kg',
  sku: 'pear-sku'
}]

exports.beforeAll = {
  inserts: {
    catalog: {
      supplier: {
        name: 'Test Supplier'
      },
      name: 'Test Catalog'
    }
  }
}

exports.post = {
  success: {
    inserts: {
      products
    },
    inputs: {
      body: {
        items: [
          {
            sku: 'apple-sku',
            quantity: 2
          },
          {
            sku: 'pear-sku',
            quantity: 1
          }
        ]
      },
      getUrl: (address) => `/api/catalogs/${address}/orders`
    },
    expects: {
      body: {
        hash: expect.any(String)
      },
      status: 200
    }
  }
}

exports.getByOrderNumber = {
  success: {
    inserts: {
      products,
      order: {
        items: [
          {
            sku: 'apple-sku',
            quantity: 50
          },
          {
            sku: 'pear-sku',
            quantity: 30
          }
        ]
      }
    },
    inputs: {
      getUrl: (address) => `/api/catalogs/${address}/orders/2`
    },
    expects: {
      body: {
        date: expect.any(Number),
        orderNumber: 2
      },
      status: 200
    }
  }
}
