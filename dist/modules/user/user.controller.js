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
exports.userController = void 0;
const user_services_1 = require("./user.services");
const user_validation_1 = __importDefault(require("./user.validation"));
//createUser
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParseData = user_validation_1.default.parse(userData);
        const result = yield user_services_1.userServices.createUser(zodParseData);
        res.status(200).json({
            success: 'true',
            message: 'user created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message || 'something went wrong',
        });
    }
});
//getAllUser
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getAllUser();
        res.status(200).json({
            success: 'true',
            message: 'allUser fetched successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//getSingleUser
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_services_1.userServices.getSingleUser(userId);
        res.status(200).json({
            success: 'true',
            message: 'single user fetched successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//updateUser
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const userData = req.body;
        const result = yield user_services_1.userServices.updateUser(userId, userData);
        res.status(200).json({
            success: 'true',
            message: ' user updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//deleteUser
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_services_1.userServices.deleteUser(userId);
        res.status(200).json({
            success: 'true',
            message: ' user deleted successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//addProductInOrder
const addProductInOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const productData = req.body;
        const result = yield user_services_1.userServices.addProductInOrder(userId, productData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//getUserOrders
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_services_1.userServices.getUserOrders(userId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//getTotalPriceInOrders
const getTotalPriceInOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const result = yield user_services_1.userServices.getTotalPriceInOrders(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: result,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addProductInOrder,
    getUserOrders,
    getTotalPriceInOrders,
};
