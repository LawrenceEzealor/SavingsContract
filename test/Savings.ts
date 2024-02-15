import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveEther: ", () => {
    
  let save: any;
  let sender: any
  let amount: any
  let receiver: any
  let amountSend: any
    
  beforeEach("Deployment:  ", async () => {
    const Save = await ethers.getContractFactory("SaveEther");
    save = await Save.deploy();
      

    const [addr1, addr2] = await ethers.getSigners()
    sender = addr1.address
    receiver = addr2.address
    amount = ethers.parseEther('0.00005')
    amountSend = ethers.parseEther('0.000009')
  });
    
  describe("Deposit money", async () => {
    it("Should deposit ", async function () {
      await save.deposit({ value: amount })
      const contractbal = await save.checkContractBal();
      const send = await save.sendOutSaving(receiver, amountSend);

        
      console.log("contract Bal: ", contractbal)
      const amt = await save.checkSavings(sender);
      console.log("amt ", amt)

      const contractbal2 = await save.checkContractBal();
      console.log("contract Bal: ", contractbal2)
        
      expect(await save.checkSavings(sender)).to.equal(amount);
        
    });

    //Testing the function to withdraw money
      
    it("Should withdraw and send Ether", async function () {
      // Deposit Ether
      await save.deposit({ value: amount });

   
    });
  });
  
});
