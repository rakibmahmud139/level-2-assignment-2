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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
//createUser
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    return result;
});
// getAllUser
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
// getSingleUser
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.default.findOne({ userId });
    return result;
});
// updateUser
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.default.updateOne({ userId }, userData);
    return result;
});
//deleteUser
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.default.deleteOne({ userId });
    return result;
});
//addProductInOrder
const addProductInOrder = (userId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.orders) {
        user.orders = [];
    }
    user.orders.push(productData);
    yield user.save();
    return user.orders;
});
//getUserOrders
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.orders || [];
});
//getTotalPriceInOrders
const getTotalPriceInOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExists(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const totalPrice = yield user_model_1.default.aggregate([
        {
            $match: {
                userId: user.userId,
            },
        },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                },
            },
        },
        {
            $project: {
                totalPrice: 1,
                _id: 0,
            },
        },
    ]);
    return totalPrice[0] || 0;
});
exports.userServices = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addProductInOrder,
    getUserOrders,
    getTotalPriceInOrders,
};
