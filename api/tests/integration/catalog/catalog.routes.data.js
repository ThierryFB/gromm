const catalogAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const secondCatalogAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

exports.post = {
  success: {
    inputs: {
      body: {
        supplier: {
          name: 'Test Supplier'
        },
        name: 'Test Catalog'
      },
      url: '/api/catalogs'
    },
    expects: {
      body: {
        address: catalogAddress
      }
    }
  }
}

exports.getByAddress = {
  success: {
    inserts: {
      catalog: {
        supplier: {
          name: 'Test Supplier 2'
        },
        name: 'Test Catalog Get By Address'
      }
    },
    inputs: {
      url: `/api/catalogs/${secondCatalogAddress}`
    },
    expects: {
      body: {
        catalogs: {
          address: secondCatalogAddress,
          name: 'Test Catalog Get By Address',
          supplier: {
            name: 'Test Supplier 2'
          }
        }
      },
      status: 200
    }
  }
}
