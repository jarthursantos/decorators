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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = exports.Insert = exports.RawQuery = exports.Query = void 0;
function Query(type) {
    return function (_target, _propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (params) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!originalMethod) {
                    throw Error("null method");
                }
                let result = originalMethod.apply(this, [params]);
                return result;
            });
        };
        // function resolve(...args: any[]): T {
        //   const result = new type();
        //   Object.assign(result, args)
        //   return result;
        // }
        // descriptor.value = resolve;
    };
}
exports.Query = Query;
function RawQuery(type) {
    return function (s, ...i) {
        return function (_target, _propertyKey, descriptor) {
            console.log({ descriptor, type, s, i });
        };
    };
}
exports.RawQuery = RawQuery;
function Insert(target, propertyKey, descriptor) { }
exports.Insert = Insert;
function Update(target, propertyKey, descriptor) { }
exports.Update = Update;
