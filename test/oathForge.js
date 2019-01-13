const OathForge = artifacts.require('OathForge.sol');
const RiftPact = artifacts.require('RiftPact.sol');
const DaiToken = artifacts.require('DAITOKEN.sol');

//const { expectThrow } = require('openzeppelin-solidity/test/helpers/expectThrow');
//const { EVMRevert } = require('openzeppelin-solidity/test/helpers/EVMRevert');
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//account 0 owner
//account 1 token holder
//account 2 token holder
//account 3 token holder
//account 4  
//account 5 
//account 6 
//account 7 
//account 8 
//account 9 

contract('OathForge Contract', async (accounts) => {

  it('Should correctly initialize constructor values of oathForge Contract', async () => {

    this.tokenhold = await OathForge.new(OathForge,OathForge, { gas: 60000000 });
    let owner = await this.tokenhold.owner.call();
    assert.equal(owner, accounts[0]);

  });

  it('Should Not be able to mint token for accounts[1] by Non Owner Account', async () => {

  try{  let mint = await this.tokenhold.mint(accounts[1],'Body',200,{from : accounts[1]});
  }catch(error){
    var error_ = 'VM Exception while processing transaction: revert';
    assert.equal(error.message, error_, 'Reverted ');

  }
  });

  it('Should be able to mint token for accounts[1]', async () => {

    let mint = await this.tokenhold.mint(accounts[1],'Body',200,{from : accounts[0]});
    let totalSupply = await this.tokenhold.totalSupply();
    let sunsetLength = await this.tokenhold.sunsetLength(0);
    assert.equal(totalSupply.toNumber(),1);
    assert.equal(sunsetLength.toNumber(),200);
});

it('Should not be able to set Token URI from non Owner Account', async () => {
try{
  let = await this.tokenhold.setTokenURI(0,'Oath Token Forge',{from: accounts[1]});
}catch(error){
  var error_ = 'VM Exception while processing transaction: revert';
  assert.equal(error.message, error_, 'Reverted ');
}

});

it('Should be able to set Token URI', async () => {

  let tokenURI = await this.tokenhold.tokenURI.call(0);
  //console.log(tokenURI.toString());
  let = await this.tokenhold.setTokenURI(0,'Oath Token Forge',{from: accounts[0]});
  let tokenURI1 = await this.tokenhold.tokenURI.call(0);
  //console.log(tokenURI1.toString());
});

it('Should be able to mint token for accounts[3]', async () => {

    let mint = await this.tokenhold.mint(accounts[3],'Body',200,{from : accounts[0]});
    let totalSupply = await this.tokenhold.totalSupply();
    let sunsetLength = await this.tokenhold.sunsetLength(0);
    assert.equal(totalSupply.toNumber(),2);
    assert.equal(sunsetLength.toNumber(),200);
});

it('Should Not be able to approve accounts[2] to spend tokens on the behalf of accounts[1] of negative token ID ', async () => {

try{  let approve = await this.tokenhold.approve(accounts[2],-1,{from : accounts[1]});
}catch(error){
  var error_ = 'VM Exception while processing transaction: revert';
  assert.equal(error.message, error_, 'Reverted ');  
}
});

it('Should be able to approve accounts[2] to spend tokens on the behalf of accounts[1] ', async () => {

    let balance = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balance.toNumber(),1);
    let tokenId = await this.tokenhold.ownerOf.call(0);
    let approve = await this.tokenhold.approve(accounts[2],0,{from : accounts[1]});
    let getApproved = await this.tokenhold.getApproved(0);
    assert.equal(getApproved,accounts[2]);

});

it('Should be able to transferFrom accounts[1] to accounts[2] ', async () => {

    let balance1 = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balance1.toNumber(),1);
    let transferFrom = await this.tokenhold.transferFrom(accounts[1],accounts[2],0,{from : accounts[2]});
    let balance = await this.tokenhold.balanceOf(accounts[2]);
    assert.equal(balance.toNumber(),1);
 
});

it('Should be able to approve accounts[1] to spend tokens on the behalf of accounts[2] ', async () => {

  let balance = await this.tokenhold.balanceOf(accounts[2]);
  assert.equal(balance.toNumber(),1);
  let tokenId = await this.tokenhold.ownerOf.call(0);
  let approve = await this.tokenhold.approve(accounts[1],0,{from : accounts[2]});
  let getApproved = await this.tokenhold.getApproved(0);
  assert.equal(getApproved,accounts[1]);

});

it('Should be able to Safe transferFrom accounts[2] to accounts[1] ', async () => {

  let balance1 = await this.tokenhold.balanceOf(accounts[2]);
  assert.equal(balance1.toNumber(),1);
  let transferFrom = await this.tokenhold.transferFrom(accounts[2],accounts[1],0,{from : accounts[1]});
  let balance = await this.tokenhold.balanceOf(accounts[1]);
  assert.equal(balance.toNumber(),1);

});


it("Should be able to transfer ownership of OathForge Contract ", async () => {

    let ownerOld1 = await this.tokenhold.owner.call();
    let newowner1 = await this.tokenhold.transferOwnership(accounts[4], { from: accounts[0] });
    let ownerNew1 = await this.tokenhold.owner.call();
    assert.equal(ownerNew1, accounts[4], 'Transfered ownership');
  });

  it("Should be able to Reannouance ownership of OathForge Contract ", async () => {


    let newowner1 = await this.tokenhold.renounceOwnership({from : accounts[4]});
  });

  it("Should be able to submit Redemption Code Hash ", async () => {

    let balance1 = await this.tokenhold.balanceOf(accounts[3]);
    assert.equal(balance1.toNumber(),1);
    let newowner1 = await this.tokenhold.submitRedemptionCodeHash(1,0xce7918a1b0485d47e6c35a974c6c0d9c5bd2b3d0f56647c0d8d0999ef88a618a, { from: accounts[3] });

  });

  it("Should be able to get timestamp Redemption Code Hash ", async () => {

    let newowner1 = await this.tokenhold.redemptionCodeHashSubmittedAt(1);

  });

  it("Should be able to get correct next token ID and total supply ", async () => {

    let nextTokenID = await this.tokenhold.nextTokenId();
    let totalSupply = await this.tokenhold.totalSupply();
    assert.equal(nextTokenID.toNumber(),2);
    assert.equal(totalSupply.toNumber(),1);
 
});

it('Should correctly initialize constructor values of Dai Token Contract', async () => {

  this.daihold = await DaiToken.new(accounts[0],{ gas: 60000000 });
  let owner = await this.daihold.owner.call();
  assert.equal(owner, accounts[0]);

});

it('Should issue Dai token to accounts[0],[1],[2],[3]', async () => {

  let DAI = await this.daihold.releaseTokens(accounts[0],1);
  let DAI1 = await this.daihold.releaseTokens(accounts[1],2);
  let DAI2 = await this.daihold.releaseTokens(accounts[2],3);
  let DAI3 = await this.daihold.releaseTokens(accounts[3],4);
  let balance1 = await this.daihold.balanceOf(accounts[0]);
  let balance2 = await this.daihold.balanceOf(accounts[1]);
  let balance3 = await this.daihold.balanceOf(accounts[2]);
  let balance4 = await this.daihold.balanceOf(accounts[3]);
  //console.log(DAI4.toNumber()/10**18);
  assert.equal(balance1.toNumber()/10**18,1);
  assert.equal(balance2.toNumber()/10**18,2);
  assert.equal(balance3.toNumber()/10**18,3);
  assert.equal(balance4.toNumber()/10**18,4);

});

it('Should correctly initialize constructor values of RiftPack Contract', async () => {

  this.RiftPact = await RiftPact.new(0,100,this.daihold.address,this.tokenhold.address, { gas: 60000000 });
});

it('Should start Auction', async () => {

  let = await this.RiftPact.startAuction();

});

it('Should Approve Auction/RiftPact contract to transfer DAI tokens on the behalf of Bidder ', async () => {

  let Approve = await this.daihold.approve(this.RiftPact.address,10**18,{from :  accounts[1]});

});

it('Should participate in a Auction by accounts[1]', async () => {

  let balance1 = await this.daihold.balanceOf(accounts[1]);
  //console.log(balance1.toNumber()/10**18);
  let = await this.RiftPact.submitBid(1000000000,{from : accounts[1]});
  let balance2 = await this.daihold.balanceOf(accounts[1]);
  //console.log(balance2.toNumber()/10**18);

});

it('Should Approve Auction/RiftPact contract to transfer DAI tokens on the behalf of Bidder ', async () => {

  let Approve = await this.daihold.approve(this.RiftPact.address,10**18,{from :  accounts[2]});

});

it('Should participate in a Auction by accounts[2]', async () => {

  let balance1 = await this.daihold.balanceOf(accounts[2]);
  //console.log(balance1.toNumber()/10**18,'balance of accounts[2], dai token ');
  let = await this.RiftPact.submitBid(20000000000,{from : accounts[2]});
  let balance2 = await this.daihold.balanceOf(accounts[2]);
  //console.log(balance2.toNumber()/10**18,'balance of accounts[2], dai token later');
  let balance3 = await this.daihold.balanceOf(this.RiftPact.address);
  //console.log(balance3.toNumber()/10**18,'balance of RiftPact after, dai token later');

});

})
