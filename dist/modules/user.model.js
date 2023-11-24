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
const mongoose_1 = require("mongoose");
const FullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const AddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});
const OrdersSchema = new mongoose_1.Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
});
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: FullNameSchema,
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: AddressSchema,
    orders: { type: [OrdersSchema], default: [] },
});
UserSchema.post('save', function (doc, next) {
    next();
});
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
UserSchema.pre('find', function (next) {
    this.select('-password');
    this.select('-userId');
    this.select('-hobbies');
    next();
});
UserSchema.pre('findOne', function (next) {
    this.select('-password');
    next();
});
UserSchema.pre('updateOne', function (next) {
    this.select('-password');
    next();
});
UserSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield User.findOne({ userId });
        return existingUser;
    });
};
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
