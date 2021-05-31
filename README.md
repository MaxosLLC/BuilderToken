MAXOS Builder Token Factory
===========================

Functionality
-------------
The builderFactory contract creates builder Tokens. Builder tokens are ERC20's with custom defined names, symbols and supplies. 100% of supply and ownership is given to a specified "dev" address. That address also has the ability to pause tranfers to/from the owner of the contract. 

Getting Started
---------------
First clone the repo and make sure all dependant frameworks are installed. Node JS and Truffle are required for network deployment. A local blockchain like ganache is required for tests and local deployments.  
  
Next, install required dependancies with:  
`npm i`  

Running tests
-------------
Truffle tests are available for local testing of the TOKEN contract. Not the factory. Tests are in the `test/BuilderToken.test.js` file.  
To run tests first make sure gananche is running a local blockchain. Then run the command:  
`truffle test`

Local deployment
----------------
Simply run `truffle deploy --to 1`. To deploy factory. The 2nd migration file will deploy a single token without the factory and to run that you first must configure the token in `migrations/2_migrate_token.js`. Then run `truffle deploy --f 2`. This migration system applies to kovan and mainnet deployment as well.

Deploying Kovan
---------------
Kovan testnet deployment script is included. Before running make sure to include a `secrets.json` file. In that json in curly braces include the following information  
```
{
    "mnemonic": "DEPLOYMENT WALLET HERE",
    "infuraId": "INFURA ID HERE"
}
```
Go to infura.io to get your infura ID. Any gas required for the deployment will come from the WALLET here.  
NOTE: If you are using a multisig wallet and want to deploy from a particular address. Go to the `migrations/1_migrate_factory.js` file and add a `const dev = "0x...."` for that address. Then replace `await deployer.deploy(Factory);` with `await deployer.deploy(Factory,{from:dev});`.

Finnaly, run `truffle deploy --network kovan --to 1`

Deploying Mainnet
-----------------
Do all the same steps for Kovan. But run  
`truffle deploy --network main --to 1`

Verify On Etherscan
-------------------
After deploying to kovan or mainnet the last thing to do is verify your BuilderFactory contract so you can interact with it. First go to Etherscan and sign up for an account to get an API Key. When you get that API key and add it into your `secrets.json` like this:
```
{
    "etherscanAPIKey" = "YOUR KEY HERE"
}
```

Then run `truffle run verify BuilderFactory --network kovan`. Of course, replace kovan with main if deployed to mainnet.

deploymentKovan.txt
-------------------
This holds the deployment details of the already deployed kovan contract. Note this contract does NOT have the dev parameter for token builds, and instead sets owner, token receiver as the transaction sender.
