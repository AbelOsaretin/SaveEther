import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveEther", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SaveEther = await ethers.getContractFactory("SaveEther");
    const saveEther = await SaveEther.deploy();

    return { saveEther, owner, otherAccount };
  }

  /*

  describe("Deposit", function () {

    it("Should check for address zero", async function () {
      const { saveEther } = await loadFixture(deployFixture);
      const NotZeroAddress =await saveEther.connect().getAddress;

    });


    it("Should receive and deposit the funds", async function () {
      const { saveEther } = await loadFixture(
        deployFixture
      );


      expect(await ethers.provider.getBalance(saveEther.target)).to.equal(
        depositedFunds
      );
    });

  }); 

  */

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called from another account", async function () {
        const { saveEther, otherAccount, owner } = await loadFixture(
          deployFixture
        );

        await expect(
          saveEther.connect(otherAccount).withdraw()
        ).to.be.revertedWith("You aren't the owner");
      });
    });
  });

  describe("Transfers", function () {
    it("Should transfer the funds to the owner", async function () {
      const { saveEther, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      const _receiver = otherAccount;
      const _amount = ethers.utils.parseEther("0.1");
      await expect(
        saveEther.connect(otherAccount).sendOutSaving(_receiver, _amount)
      ).to.be.revertedWith("You aren't the owner");
    });
  });
});
