// test/MyToken.test.js

const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');

let myTokenV1;
let myTokenV2;

describe('MyToken is properly upgrade', function () {
  it('deploys', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
    // await MyTokenV1.deploy();
    // await upgrades.deployProxy(MyTokenV1);
    myTokenV1 = await upgrades.deployProxy(MyTokenV1, { kind: 'uups' });
  });

  it('upgrades', async function () {
    const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');
    myTokenV2 = await upgrades.upgradeProxy(myTokenV1.address, MyTokenV2);
  });

  it('addresses', async function () {
    expect(myTokenV2.address).to.equal(myTokenV1.address);
  });

});

describe('MyToken upgrade blocked', function () {
  it('upgrades', async function () {
    const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
    myTokenV1 = await upgrades.deployProxy(MyTokenV1, { kind: 'uups' });
    const MyTokenV2Broken = await ethers.getContractFactory('MyTokenV2Broken');
    await expect(upgrades.upgradeProxy(myTokenV1.address, MyTokenV2Broken)).to.be.throw;
    // throw StorageUpgradeErrors
    // await upgrades.upgradeProxy(myTokenV1.address, MyTokenV2Broken);
  });
});