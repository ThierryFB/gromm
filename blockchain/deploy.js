const hre = require("hardhat");

async function main() {
  const networkName = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("=".repeat(50));
  console.log("DEPLOYMENT STARTING");
  console.log("=".repeat(50));
  console.log(`Network: ${networkName}`);
  console.log(`Deployer address: ${deployer.address}`);
  
  // Check deployer balance
  const balance = await deployer.getBalance();
  console.log(`Deployer balance: ${hre.ethers.utils.formatEther(balance)} VET`);
  
  if (balance.isZero()) {
    throw new Error("Deployer account has no VET for gas fees");
  }

  try {
    // Deploy Catalog contract
    console.log("\nDeploying Catalog contract...");
    const Catalog = await hre.ethers.getContractFactory("Catalog");
    
    // Estimate gas before deployment
    const deployTx = Catalog.getDeployTransaction();
    const estimatedGas = await deployer.estimateGas(deployTx);
    console.log(`Estimated gas: ${estimatedGas.toString()}`);
    
    const catalog = await Catalog.deploy({
      gasLimit: estimatedGas.mul(120).div(100) // Add 20% buffer
    });
    
    console.log(`Transaction hash: ${catalog.deployTransaction.hash}`);
    console.log("Waiting for deployment confirmation...");
    
    await catalog.deployed();
    
    console.log("\n" + "=".repeat(50));
    console.log("DEPLOYMENT SUCCESSFUL");
    console.log("=".repeat(50));
    console.log(`Catalog contract deployed to: ${catalog.address}`);
    console.log(`Network: ${networkName}`);
    console.log(`Block number: ${catalog.deployTransaction.blockNumber}`);
    console.log(`Gas used: ${catalog.deployTransaction.gasLimit?.toString() || 'N/A'}`);
    
    // Save deployment info
    const deploymentInfo = {
      network: networkName,
      contractAddress: catalog.address,
      deployerAddress: deployer.address,
      transactionHash: catalog.deployTransaction.hash,
      blockNumber: catalog.deployTransaction.blockNumber,
      timestamp: new Date().toISOString(),
      chainId: await deployer.getChainId()
    };
    
    console.log("\nDeployment Info:");
    console.log(JSON.stringify(deploymentInfo, null, 2));
    
    // Verify deployment by calling a contract function
    console.log("\nVerifying deployment...");
    const owner = await catalog.owner();
    console.log(`Contract owner: ${owner}`);
    
    if (owner !== deployer.address) {
      console.warn("WARNING: Contract owner doesn't match deployer!");
    }
    
    console.log("\n✅ Deployment completed successfully!");
    
  } catch (error) {
    console.error("\n❌ Deployment failed:");
    console.error(error.message);
    
    if (error.code === 'INSUFFICIENT_FUNDS') {
      console.error("❌ Insufficient funds for gas fees");
    } else if (error.code === 'NETWORK_ERROR') {
      console.error("❌ Network connection error");
    }
    
    process.exit(1);
  }
}

// Error handling for the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script execution failed:");
    console.error(error);
    process.exit(1);
  });