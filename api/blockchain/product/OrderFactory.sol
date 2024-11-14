// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract OrderFactory {
    struct OrderItem {
        address product;
        uint256 quantity;
    }

    struct OrderHeader {
        address supplier;
        string orderDate;
    }

    OrderHeader public header;
    OrderItem[] public items;

    constructor(OrderHeader memory _header, OrderItem[] memory _items) public {
        header = _header;

        for (uint i = 0; i < _items.length; i++) {
            items.push(_items[i]);
        }
    }
}