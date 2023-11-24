"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'firstName is required' }),
    lastName: zod_1.z.string().min(1, { message: 'lastName is required' }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, { message: 'street is required' }),
    city: zod_1.z.string().min(1, { message: 'city is required' }),
    country: zod_1.z.string().min(1, { message: 'country is required' }),
});
const OrdersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    quantity: zod_1.z.number().optional(),
});
const UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().min(1, { message: 'userId is required' }),
    username: zod_1.z.string().min(1, { message: 'username ia required' }),
    password: zod_1.z.string().min(1).max(20, { message: 'password is required' }),
    fullName: FullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email({ message: 'email is required' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1, { message: 'at least hobbies is required' })),
    address: AddressValidationSchema,
    orders: zod_1.z.array(OrdersValidationSchema),
});
exports.default = UserValidationSchema;
