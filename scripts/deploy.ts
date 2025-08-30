import { network } from "hardhat";

const { ethers } = await network.connect({
  network: "hardhatOp",
  chainType: "op",
});

async function main() {
  const [deployer, user] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const Boleto3 = await ethers.getContractFactory("Boleto3");
  const boleto3 = await Boleto3.deploy(user.address, deployer.address);

  await boleto3.waitForDeployment();

  console.log("Boleto3 deployed to:", await boleto3.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
