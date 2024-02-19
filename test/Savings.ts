import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Save ether Test", function () {
  
  async function deploySaveEtherContracts() {
    const [owner, user1] = await ethers.getSigners();
    
    const SaveEther = await ethers.getContractFactory("SaveEther");
    const  saveEther = (await SaveEther.deploy()) ;
    return {owner, user1, saveEther}

  }

  describe("Check Contract bal", function () {
    it("Check Balance", async function () {
      const {saveEther, user1} = await deploySaveEtherContracts();
      
      expect(await saveEther.checkContractBal()).to.equal(0)
    })
  })

  describe("Deposit", function () {
    it("it should deposit ether properly", async function () {
      const {saveEther, owner, user1} = await loadFixture(deploySaveEtherContracts);
      const depositAmount = ethers.parseEther("2");
      expect(await saveEther.checkSavings(owner.address)).to.equal(0)
      await saveEther.connect(owner).deposit({ value: depositAmount })
      expect(await saveEther.connect(owner).checkSavings(owner.address)).to.equal(depositAmount);
      expect(await saveEther.connect(user1).checkContractBal()).to.eq(depositAmount)
    })
  })

  describe("withdraw", function () {
    it("it should be able to withdraw ether properly", async function () {
      const { saveEther, owner, user1 } = await loadFixture(deploySaveEtherContracts);
      // const withdrawAmount = ethers.parseEther("1");
      const depositAmount = ethers.parseEther("1");
      await saveEther.connect(owner).deposit({ value: depositAmount })
      expect(await saveEther.checkSavings(owner.address)).to.equal(depositAmount);
      // await saveEther.connect(owner).withdraw();
      // expect(await saveEther.connect(owner).checkSavings(owner.address)).to.equal(withdrawAmount);
      // expect(await saveEther.connect(user1).checkContractBal()).to.equal(withdrawAmount);
    })
    it("should not send to address zero", async function () {
      const zeroAddress = "0x0000000000000000000000000000000000000000"
      const account = ethers.getSigners();
      expect(account).to.not.equal(zeroAddress);
    })
    it("User savings should be greater than zero", async function () {
      const { saveEther, owner, user1 } = await loadFixture(deploySaveEtherContracts);
      const balance = ethers.parseEther("2");
      await saveEther.connect(owner).deposit({ value: balance })
      expect(await saveEther.checkSavings(owner.address)).to.equal(balance);
    })
  })

    //make the sendOutSavings functions work
  // describe("sendOutSavings", async function () {
  //   it("The contract should be able to send out savings", async function () {
  //     const { saveEther, owner, user1 } = await loadFixture(deploySaveEtherContracts);
  //     const amount = ethers.parseEther("3");
  //     const balance = ethers.parseEther("5");
  //     expect(await saveEther.checkContractBal()).to.equal(balance);
  //   })
  // })
})