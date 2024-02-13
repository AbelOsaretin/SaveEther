import { ethers } from "hardhat";

async function main() {
  const saver = await ethers.deployContract("SaveEther");

  await saver.waitForDeployment();

  console.log(`Contract is deployed to ${saver.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
