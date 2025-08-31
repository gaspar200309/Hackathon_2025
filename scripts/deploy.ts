import { network } from "hardhat";

const { ethers } = await network.connect({
  network: "hardhatOp",
  chainType: "op",
});

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. Deploy token
  const Boleto3 = await ethers.getContractFactory("Boleto3");
  const boleto3 = await Boleto3.deploy(
    deployer.address,   // recipient inicial
    deployer.address    // owner inicial (temporalmente el deployer)
  );
  await boleto3.waitForDeployment();
  console.log("Boleto3 deployed at:", await boleto3.getAddress());

  // 2. Deploy sale
  const Boleto3Sale = await ethers.getContractFactory("Boleto3Sale");
  const sale = await Boleto3Sale.deploy(await boleto3.getAddress());
  await sale.waitForDeployment();
  console.log("Boleto3Sale deployed at:", await sale.getAddress());

  // 3. Transferir ownership del token a la Sale
  const tx = await boleto3.transferOwnership(await sale.getAddress());
  await tx.wait();
  console.log("Ownership transferred to Sale contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
