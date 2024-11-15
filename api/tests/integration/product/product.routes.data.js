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

exports.put = {
  success: {
    inputs: {
      body: {
        name: 'Apple',
        price: 199,
        description: 'A delicious apple',
        unitOfMeasure: 'kg',
        sku: 'apple-sku'
      },
      getUrl: (address) => `/api/catalogs/${address}/products/apple-sku`
    },
    expects: {
      body: {
        name: 'Apple',
        price: 1.99,
        description: 'A delicious apple',
        unitOfMeasure: 'kg',
        sku: 'apple-sku'
      },
      status: 200
    }
  }
}

exports.getBySku = {
  success: {
    inserts: {
      product: {
        name: 'Pear',
        price: 299,
        description: 'A delicious pear',
        unitOfMeasure: 'kg',
        sku: 'pear-sku'
      }
    },
    inputs: {
      getUrl: (address) => `/api/catalogs/${address}/products/pear-sku`
    },
    expects: {
      body: {
        name: 'Pear',
        price: 2.99,
        description: 'A delicious pear',
        unitOfMeasure: 'kg',
        sku: 'pear-sku'
      },
      status: 200
    }
  }
}
