# BuilderToken
Team-building ERC20 token. Transfers can be paused except distributions to team members.

Based on OpenZeppelin code:
* Pausable. This function is modified to allow transfers from an admin address
* Capped
* Burnable

We will use this token during the team building and pre-deployement phases of a DeFi project. The project team can use it as a simple form of DAO shares, and a social token.

The tokens can be used to unlock "token gated" and "social token" features. For example, the holder of a threshold number of these coins will get access to a private Discord for the project. They can vote on Snapshot. Later, the BuilderTokens can be replaced by functional tokens in a decentralized system.

## Process
* We will create a fixed number of tokens - often 10,000,000. 
* We will transfer these to a team leader account - possibly a Gnosis safe. The leader should communicate a plan for allocating the tokens to contributors
* The leader will give contributors token allocations.
* During the team building phase, contributors cannot transfer to other wallets. Later, we can experiment with removing the pause and see if people want transfer tokens.
* We can replace the BuilderTokens with functional tokens in a decentralized system. We can do this by automatically airdropping an equivalent number of functional tokens, or by asking BuilderToken holders to claim their functional tokens. In this process, we can move between chains. For example, we can do team building on a low-cost chain like Matic, and then issue functional tokens on the Ethereum main chain.
