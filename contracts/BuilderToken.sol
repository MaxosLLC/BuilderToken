// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
* @title Builder Toke
* @author Carson Case (carsonpcase@gmail.com)
* @notice Pausable ERC20 token. Where transfers are not possible when paused with the exception of the owner
 */
contract BuilderToken is ERC20, Ownable, Pausable{

    /**
    * @notice Constructor
    * @param _name ERC20 name
    * @param _symbol ERC20 symbol
    * @param _supply FIXED. Initial supply to mint to contract deployer
     */
    constructor(
    string memory _name,
    string memory _symbol,
    address _dev,
    uint _supply
    )
    ERC20(_name, _symbol)
    Ownable()
    Pausable()
    {
        transferOwnership(_dev);
        _mint(_dev, _supply);
    }

    /**
    * @notice Only for owner to call. Toggles pause
     */
    function togglePause() external onlyOwner{
        if(paused()){
            _unpause();
        }else{
            _pause();
        }
    }

    /**
    * @notice anyone can burn tokens
    * @param ammount to burn
     */
    function burn(uint ammount)external{
        _burn(msg.sender,ammount);
    }

    /**
    * @dev ERC20 transfer hook checks if token is paused OR if sender is owner. If owner it doesn't matter
     */
    function _beforeTokenTransfer(address from, address to, uint amount) internal override{
        require(
            !paused() ||
            from == owner() ||
            to ==owner(),
            "When paused transfers must be to/from owner"
        );
    }

}