"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', user_route_1.userRouter);
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to my world',
    });
});
exports.default = app;
