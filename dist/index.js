"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
require("reflect-metadata");
const entity_1 = require("./app/decorators/entity");
const property_1 = require("./app/decorators/property");
const query_1 = require("./app/decorators/query");
let User = /** @class */ (() => {
    let User = class User {
    };
    __decorate([
        property_1.Property,
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        property_1.Property,
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        property_1.Property,
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        property_1.Property({ name: "birth_date" }),
        __metadata("design:type", Date)
    ], User.prototype, "birthDate", void 0);
    __decorate([
        property_1.Property,
        __metadata("design:type", Number)
    ], User.prototype, "age", void 0);
    User = __decorate([
        entity_1.Entity("users")
    ], User);
    return User;
})();
let Profile = /** @class */ (() => {
    let Profile = class Profile {
    };
    __decorate([
        property_1.Property,
        __metadata("design:type", String)
    ], Profile.prototype, "picture", void 0);
    Profile = __decorate([
        entity_1.Entity("profiles")
    ], Profile);
    return Profile;
})();
let ProfileDAO = /** @class */ (() => {
    class ProfileDAO {
        create(profile) {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error(`unable to create ${profile}`);
            });
        }
        createMany(profiles) {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error(`unable to create ${profiles}`);
            });
        }
        createAndPopulate(profile, relations) {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error(`unable to create ${profile} with ${relations}`);
            });
        }
        getProfileRaw(props) {
            return __awaiter(this, void 0, void 0, function* () {
                throw Error(`unable to find ${props}`);
            });
        }
        update() {
            return __awaiter(this, void 0, void 0, function* () { });
        }
    }
    __decorate([
        query_1.Insert,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Profile]),
        __metadata("design:returntype", Promise)
    ], ProfileDAO.prototype, "create", null);
    __decorate([
        query_1.Insert,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], ProfileDAO.prototype, "createMany", null);
    __decorate([
        query_1.Insert,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Profile, Array]),
        __metadata("design:returntype", Promise)
    ], ProfileDAO.prototype, "createAndPopulate", null);
    __decorate([
        (query_1.RawQuery(Profile) `
    SELECT * WHERE ${({ name }) => name}
  `),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ProfileDAO.prototype, "getProfileRaw", null);
    __decorate([
        query_1.Update,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ProfileDAO.prototype, "update", null);
    return ProfileDAO;
})();
new ProfileDAO()
    .getProfileRaw({ name: "Santos" })
    .then(console.log)
    .catch(console.log);
// TODO: if a entity don't have a primary key, then create an
// TODO: create FK's
// TODO: callbacks to onDelete, onUpdate, onInsert...
// TODO: decorator to ignore a field in an entity
// TODO: insert params, onConflic and more
// TODO: decorator to PK
// TODO: create the relationship system { parent, parentColumn, entityColumn }
// TODO: OneToOne, OneToMany, ManyToOne and ManyToMany
// TODO: Converters of types
