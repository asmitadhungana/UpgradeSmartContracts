//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract SimpleStorage is Initializable {
    uint256 storedValue;

    function initialize () public initializer {
        storedValue = 0;
    }

    function retrieve() public view returns (uint256){
        return storedValue;
    }

}


