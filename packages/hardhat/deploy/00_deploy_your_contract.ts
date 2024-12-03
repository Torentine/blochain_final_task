import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("YourContract", {
    from: deployer,
    args: [deployer], // Убедитесь, что здесь указаны нужные аргументы для конструктора
    log: true,
    autoMine: true, // Ускоряет процесс развертывания на локальных сетях
  });

  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
  console.log("👋 Initial greeting:", await yourContract.greeting());
  console.log("YourContract deployed to:", yourContract.address);
};

export default deployYourContract;

// Задаем тег для этого скрипта развертывания
deployYourContract.tags = ["YourContract"];

