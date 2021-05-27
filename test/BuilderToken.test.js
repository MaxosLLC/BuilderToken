const { assert, expect } = require("chai");
require("chai")
    .use(require("chai-as-promised"))
    .should();

const BuilderToken = artifacts.require("BuilderToken");
let builderToken;

//Helper functions
function tokens(n){
    return web3.utils.toWei(n,"Ether");
}

contract("BuilderToken",async([dev,user1, user2])=>{

    before(async()=>{
        builderToken = await BuilderToken.new("Builder Token", "BUILD", tokens('10000'));
    });

    describe("Launch", async()=>{

        it("has name",async()=>{
            const name = await builderToken.name();
            assert.equal(name, "Builder Token");
        });

        it("has symbol",async()=>{
            const symbol = await builderToken.symbol();
            assert.equal(symbol, "BUILD");
        });

        it("has supply",async()=>{
            const supply = await builderToken.balanceOf(dev);
            assert.equal(supply, tokens("10000"));
        });

    });

    describe("pausing", async()=>{

        it("Dev Transfers before pause", async()=>{
            await builderToken.transfer(user1, tokens("10"),{from:dev});
            const bal = await builderToken.balanceOf(user1);
            assert.equal(bal.toString(), tokens("10").toString());
        });

        it("Non-dev transfers before pause",async()=>{
            await builderToken.transfer(user2, tokens("5"),{from:user1});
            const bal = await builderToken.balanceOf(user2);
            assert.equal(bal.toString(), tokens("5").toString()); 
        });

        it("Non-dev cannot pause",async()=>{
            try {
                await builderToken.togglePause({from:user1});
                assert.fail();
            } catch (error) {
                assert(true);
            }
        });

        it("Dev can pause",async()=>{
            await builderToken.togglePause({from:dev});
            const isPause = await builderToken.paused();
            console.log(isPause);
            assert(isPause);
        });

        it("Non-dev can no longer transfer",async()=>{
            try {
                await builderToken.transfer(user2,tokens("1"),{from:user1});
                assert.fail();
            } catch (error) {
                assert(true);
            }
        });

        it("Dev can transfer",async()=>{
            await builderToken.transfer(user2, tokens("5"),{from:dev});
            const bal = await builderToken.balanceOf(user2);
            assert.equal(bal.toString(), tokens("10").toString()); 
        });

        it("Dev can unpause and non-dev can transfer",async()=>{
            await builderToken.togglePause({from:dev});
            await builderToken.transfer(user2,tokens("1"),{from:user1});
            const bal = await builderToken.balanceOf(user2);
            assert.equal(bal.toString(), tokens("11").toString()); 
        });
    })
})