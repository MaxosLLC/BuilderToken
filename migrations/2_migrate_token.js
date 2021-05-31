const BuilderToken = artifacts.require("BuilderToken");

module.exports = async function (deployer) {
  await deployer.deploy(BuilderToken,"NAME","SYMBOL","DEV ADDRESS","SUPPLY_QUANTITY");
};
