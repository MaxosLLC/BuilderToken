const Factory = artifacts.require("BuilderFactory");

module.exports = async function (deployer) {
  await deployer.deploy(Factory);
};
