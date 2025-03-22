const Types = artifacts.require("Types");
const Users = artifacts.require("Users");
const RansomwareDetection = artifacts.require("RansomwareDetection");


module.exports = async function (deployer, network, accounts) {
  if (network === "development") {

    await deployer.deploy(Types);
    await deployer.link(Types, Users);
    await deployer.deploy(Users);
    await deployer.deploy(RansomwareDetection, "Admin", "admin@gts.com");
  } else {
    // For live & test networks, it comes here
    await deployer.deploy(Types);
    await deployer.link(Types, Users);
    await deployer.deploy(Users);
    await deployer.deploy(RansomwareDetection, "Admin", "admin@gts.com");
  }
};
