"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const manager_1 = __importDefault(require("../core/manager"));
function Property(...args) {
    let options;
    function register(target, name) {
        if (!options) {
            options = { name };
        }
        manager_1.default.registerColumn(target.constructor, {
            name: options.name,
            type: Reflect.getMetadata("design:type", target, name),
        });
    }
    if (args.length === 1) {
        options = args[0];
    }
    else if (args.length === 3) {
        register(args[0], args[1]);
        return;
    }
    return register;
}
exports.Property = Property;
