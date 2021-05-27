const BuilderToken = artifacts.require("BuilderToken");

module.exports = function (deployer) {
  deployer.deploy(BuilderToken,"Builder Token", "BUILD", web3.utils.toWei('10000','Ether'));
};
