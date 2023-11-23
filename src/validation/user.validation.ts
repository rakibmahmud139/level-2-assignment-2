import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'firstName is required' }),
  lastName: z.string().min(1, { message: 'lastName is required' }),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1, { message: 'street is required' }),
  city: z.string().min(1, { message: 'city is required' }),
  country: z.string().min(1, { message: 'country is required' }),
});

const OrdersValidationSchema = z.object({
  productName: z.string().min(1, { message: 'street is required' }),
  price: z.number(),
  quantity: z.number(),
});

const UserValidationSchema = z.object({
  userId: z.number().min(1, { message: 'userId is required' }),
  username: z.string().min(1),
  password: z.string().min(1).max(20, { message: 'password is required' }),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: 'email is required' }),
  isActive: z.boolean(),
  hobbies: z.array(
    z.string().min(1, { message: 'at least hobbies is required' }),
  ),
  address: AddressValidationSchema,
  orders: OrdersValidationSchema,
});

export default UserValidationSchema;
