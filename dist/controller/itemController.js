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
const Repository_1 = __importDefault(require("../repositories/Repository"));
function getItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const item = yield Repository_1.default.getItem(parseInt(id));
        if (item)
            res.json(item);
        else
            res.sendStatus(404);
    });
}
function getItems(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield Repository_1.default.getItems();
        res.json(items);
    });
}
function postItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = req.body;
        const result = yield Repository_1.default.addItem(item);
        if (result)
            res.status(201).json(result);
        else
            res.sendStatus(400);
    });
}
function patchItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const customer = req.body;
        const result = yield Repository_1.default.updateItem(parseInt(id), customer);
        if (result)
            res.json(result);
        else
            res.sendStatus(404);
    });
}
function deleteItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const success = yield Repository_1.default.deleteItem(parseInt(id));
        if (success)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    });
}
exports.default = {
    getItem,
    getItems,
    postItem,
    patchItem,
    deleteItem
};
