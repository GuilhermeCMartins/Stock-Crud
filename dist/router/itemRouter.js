"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = __importDefault(require("../controller/itemController"));
const router = express_1.default.Router();
router.get('/:id', itemController_1.default.getItem);
router.get('/', itemController_1.default.getItems);
router.post('/', itemController_1.default.postItem);
router.patch('/:id', itemController_1.default.patchItem);
router.delete('/:id', itemController_1.default.deleteItem);
exports.default = router;
