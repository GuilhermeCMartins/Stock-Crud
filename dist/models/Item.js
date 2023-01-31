"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, price) {
        this.id = Item.nextId++;
        this.name = name;
        this.price = price;
    }
}
exports.default = Item;
Item.nextId = 1;
