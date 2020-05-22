"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pre = exports.classDecorator = exports.main = void 0;
function main() {
    return function (constructor) {
        // console.log("main", target);
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}
exports.main = main;
function classDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.classDecorator = classDecorator;
function pre() {
    return function (target, propertyKey, descriptor) {
        console.log("pre", {
            constructor: target.constructor,
            propertyKey: propertyKey,
            descriptor: descriptor,
        });
    };
}
exports.pre = pre;
function timeout(milliseconds) {
    if (milliseconds === void 0) { milliseconds = 0; }
    console.log({ timeout: milliseconds });
    return function (target, name, descriptor) {
        console.log({ target: target, name: name, keys: Object.keys(target), descriptor: descriptor });
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            setTimeout(function () {
                originalMethod.apply(_this, args);
            }, milliseconds);
        };
        return descriptor;
    };
}
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Employee.prototype.greet = function (message) {
        console.log(message);
        return this.firstName + " " + this.lastName + " says: " + message;
    };
    __decorate([
        timeout(1000),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", String)
    ], Employee.prototype, "greet", null);
    return Employee;
}());
var emp = new Employee("Mohan Ram", "Ratnakumar");
emp.greet("hello");
