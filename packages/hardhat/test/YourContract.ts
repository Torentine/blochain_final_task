import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";

describe("YourContract", function () {
  let yourContract: YourContract;
  let owner: any;
  let addr1: any;

  before(async () => {
    owner, addr1 = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await yourContractFactory.deploy(owner.address)) as YourContract;
    await yourContract.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right initial greeting", async function () {
      expect(await yourContract.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should set the owner correctly", async function () {
      expect(await yourContract.owner()).to.equal(owner.address);
    });
  });

  describe("Setting Greeting", function () {
    it("Should allow the owner to set a new greeting", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";
      await yourContract.setGreeting(newGreeting);
      expect(await yourContract.greeting()).to.equal(newGreeting);
    });

    it("Should not allow non-owners to set a new greeting", async function () {
      const newGreeting = "Attempt to change greeting!";
      await expect(yourContract.connect(addr1).setGreeting(newGreeting)).to.be.revertedWith("Not the Owner");
    });
  });

  describe("Counters", function () {
    it("Should correctly increment the greeting counter", async function () {
      const initialCounter = await yourContract.totalCounter();
      await yourContract.setGreeting("Another greeting!");
      expect(await yourContract.totalCounter()).to.equal(initialCounter.add(1));
    });

    it("Should correctly increment user greeting counter", async function () {
      await yourContract.connect(addr1).setGreeting("Greeting from addr1!");
      expect(await yourContract.userGreetingCounter(addr1.address)).to.equal(1);
    });
  });
});