//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract SimpleStorage is Initializable {
    uint256 storedValue;
    uint256 addedValue;

    function initialize () public initializer {
        storedValue = 0;
    }

    function retrieve() public view returns (uint256){
        return storedValue;
    }

    function incrementValue(uint256 x) public {
        addedValue = x;
        storedValue += x;
    }
}


