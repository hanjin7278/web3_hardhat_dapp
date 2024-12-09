// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "hardhat/console.sol";

// 定义一个名为Greeter的合约
contract Greeter {
    // 定义一个名为greeting的字符串变量
    string greeting;

    // 构造函数，用于初始化greeting变量
    constructor(string memory _greeting) {
        // 打印部署时的问候语
        console.log("Deploying a Greeter with greeting:",_greeting);
        // 将传入的问候语赋值给greeting变量
        greeting = _greeting;
    }

    // 定义一个名为greet的公共视图函数，用于返回问候语
    function greet() public view returns(string memory) {
        // 返回greeting变量
        return greeting;
    }

    // 定义一个名为setGreeting的公共函数，用于修改问候语
    function setGreeting(string memory _greeting) public {
        // 打印修改前的问候语和修改后的问候语
        console.log("Changing greeting from '%s' to '%s'",greeting,_greeting);
        // 将传入的问候语赋值给greeting变量
        greeting = _greeting;
    }
}
