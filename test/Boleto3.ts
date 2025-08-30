import { expect } from "chai";
import { network } from "hardhat";
import { Boleto3 } from "../typechain-types";
const { ethers } = await network.connect();

describe("Boleto3 Token", function () {
    let boleto3: Boleto3;
    let owner: any;
    let addr1: any;
    let addr2: any;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const Boleto3 = await ethers.getContractFactory("Boleto3");
        boleto3 = (await Boleto3.deploy(addr1.address, owner.address)) as Boleto3;
        await boleto3.waitForDeployment();
    });

    it("✅ Deploy correcto con nombre, símbolo y supply inicial", async function () {
        expect(await boleto3.name()).to.equal("Boleto3");
        expect(await boleto3.symbol()).to.equal("BOL3");

        const decimals = await boleto3.decimals();
        const supply = await boleto3.totalSupply();

        expect(supply).to.equal(ethers.parseUnits("1000000", decimals));
        expect(await boleto3.balanceOf(addr1.address)).to.equal(
            ethers.parseUnits("1000000", decimals)
        );
    });

    it("✅ Transferencias entre cuentas funcionan", async function () {
        const decimals = await boleto3.decimals();

        await boleto3.connect(addr1).transfer(addr2.address, ethers.parseUnits("100", decimals));

        expect(await boleto3.balanceOf(addr2.address)).to.equal(ethers.parseUnits("100", decimals));
    });

    it("✅ Solo el owner puede pausar y despausar", async function () {
        await boleto3.connect(owner).pause();
const decimals = Number(await boleto3.decimals());

await expect(
  boleto3.connect(addr1).transfer(addr2.address, ethers.parseUnits("1", decimals))
).to.be.revertedWithCustomError(boleto3, "EnforcedPause");


        await boleto3.connect(owner).unpause();
        await boleto3.connect(addr1).transfer(addr2.address, 10);

        expect(await boleto3.balanceOf(addr2.address)).to.equal(10);
    });

    it("✅ Owner puede mintear tokens", async function () {
        const decimals = await boleto3.decimals();

        await boleto3.connect(owner).mint(addr2.address, ethers.parseUnits("500", decimals));

        expect(await boleto3.balanceOf(addr2.address)).to.equal(ethers.parseUnits("500", decimals));
    });

    it("✅ Los usuarios pueden quemar (burn) sus tokens", async function () {
        const decimals = await boleto3.decimals();

        await boleto3.connect(addr1).burn(ethers.parseUnits("1000", decimals));

        expect(await boleto3.balanceOf(addr1.address)).to.equal(
            ethers.parseUnits("999000", decimals)
        );
    });

    it("✅ Delegación y votos funcionan", async function () {
        const decimals = await boleto3.decimals();

        // addr1 delega a sí mismo
        await boleto3.connect(addr1).delegate(addr1.address);

        const votes = await boleto3.getVotes(addr1.address);
        expect(votes).to.equal(ethers.parseUnits("1000000", decimals));
    });
});
