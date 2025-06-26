const { ethers } = require('ethers');
const CatalogArtifact = require('../../artifacts/blockchain/contracts/Catalog.sol/Catalog.json');

class ContractFactory {
  constructor(provider, signer) {
    this.provider = provider;
    this.signer = signer;
  }

  // Deploy a new Catalog contract
  async deployCatalog(supplierName, catalogName) {
    try {
      // For VeChain compatibility, use the original provider/signer without network detection
      const provider = this.provider;
      const signer = this.signer;
      
      const factory = new ethers.ContractFactory(
        CatalogArtifact.abi,
        CatalogArtifact.bytecode,
        signer
      );

      console.log(`Deploying Catalog contract for supplier: ${supplierName}, catalog: ${catalogName}`);
      
      // Deploy with constructor parameters
      const contract = await factory.deploy(supplierName, catalogName, {
        gasLimit: 8000000,
        gasPrice: ethers.utils.parseUnits('1', 'gwei')
      });
      
      console.log(`Deployment transaction hash: ${contract.deployTransaction.hash}`);
      
      // Wait for deployment confirmation
      await contract.deployed();
      
      console.log(`Catalog contract deployed at: ${contract.address}`);
      
      return {
        address: contract.address,
        transactionHash: contract.deployTransaction.hash,
        contract: contract
      };
    } catch (error) {
      console.error('Contract deployment failed:', error);
      throw new Error(`Contract deployment failed: ${error.message}`);
    }
  }

  // Attach to an existing Catalog contract
  async attachCatalog(contractAddress) {
    try {
      // Configure network settings for VeChain - disable network detection
      const network = {
        name: 'vechain',
        chainId: 100010, // Thor solo mode
        ensAddress: null,
        _defaultProvider: null
      };
      
      // Create provider with network configuration and skip detection
      const provider = new ethers.providers.JsonRpcProvider({
        url: this.provider.connection.url,
        skipFetchSetup: true
      }, network);
      
      const signer = new ethers.Wallet(this.signer.privateKey, provider);
      
      const contract = new ethers.Contract(
        contractAddress,
        CatalogArtifact.abi,
        signer
      );

      // Verify the contract exists by calling a read function
      await contract.catalogName();
      
      return contract;
    } catch (error) {
      console.error('Failed to attach to contract:', error);
      throw new Error(`Failed to attach to contract at ${contractAddress}: ${error.message}`);
    }
  }

  // Get contract ABI for frontend integration
  static getCatalogABI() {
    return CatalogArtifact.abi;
  }

  // Get contract bytecode
  static getCatalogBytecode() {
    return CatalogArtifact.bytecode;
  }
}

module.exports = ContractFactory;