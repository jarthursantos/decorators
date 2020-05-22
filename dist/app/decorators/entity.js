"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const manager_1 = __importDefault(require("../core/manager"));
function Entity(name) {
    return function (constructor) {
        manager_1.default.registerTable({ name, constructor });
    };
}
exports.Entity = Entity;
