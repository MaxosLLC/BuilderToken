// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BuilderToken.sol";

contract BuilderFactory is Ownable{
    event NewToken(address newTokenAddress);
    constructor() Ownable(){}

    function buildToken(string memory _name, string memory _symbol, address _dev, uint _supply)external onlyOwner returns(address){
        BuilderToken token = new BuilderToken(_name, _symbol, _dev, _supply);
        emit NewToken(address(token));
        return(address(token));
    }
}