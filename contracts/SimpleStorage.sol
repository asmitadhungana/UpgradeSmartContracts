//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract SimpleStorage is Initializable {
    using SafeMath for uint256;
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
        storedValue.add(x);
    }
}


