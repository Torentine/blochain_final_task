import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/
  Deploys a contract named "VotingContract" using the deployer account.
   @param hre HardhatRuntimeEnvironment object.
 /
const deployVotingContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Развертывание контракта с начальным значением (например, если нужно передать адрес владельца)
  await deploy("YourContract", {
    from: deployer,
    args: , // Здесь можно передать аргументы конструктора, если они есть
    log: true,
    autoMine: true, // Ускоряет процесс развертывания на локальных сетях
  });

  // Получаем развернутый контракт для взаимодействия с ним
  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
  
  // Проверяем начальное состояние контракта (например, выводим приветствие)
  console.log("👋 Initial greeting:", await yourContract.greeting());

  // Выводим адрес развернутого контракта
  console.log("VotingContract deployed to:", yourContract.address);
};

export default deployVotingContract;

// Задаем тег для этого скрипта развертывания
deployVotingContract.tags = "YourContract";