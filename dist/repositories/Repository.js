"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../models/Item"));
const items = [];
function getItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            return resolve(items.find(c => c.id === id));
        });
    });
}
function getItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            return resolve(items);
        });
    });
}
function addItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!item.name || !item.price)
                return reject(new Error(`Invalid item.`));
            const newItem = new Item_1.default(item.name, item.price);
            items.push(newItem);
            return resolve(newItem);
        });
    });
}
function updateItem(id, newItem) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const index = items.findIndex(c => c.id === id);
            if (index) {
                if (newItem.name && items[index].name !== newItem.name)
                    items[index].name = newItem.name;
                if (newItem.price && items[index].price !== newItem.price)
                    items[index].price = newItem.price;
                return resolve(items[index]);
            }
            return resolve(undefined);
        });
    });
}
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const index = items.findIndex(c => c.id === id);
            if (index) {
                items.splice(index, 1);
                return resolve(true);
            }
            return resolve(false);
        });
    });
}
exports.default = {
    getItem,
    getItems,
    deleteItem,
    addItem,
    updateItem
};
