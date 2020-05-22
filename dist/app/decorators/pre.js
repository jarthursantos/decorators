"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.pre = void 0;
function pre() {
    return function (target, propertyKey, descriptor) {
        console.log("pre", { constructor: target.constructor, propertyKey: propertyKey, descriptor: descriptor });
    };
}
exports.pre = pre;
function main() {
    return function (target) {
        console.log('main', target);
    };
}
exports.main = main;
