import { Schema, model } from 'mongoose';
import {
  Address,
  FullName,
  IUser,
  Orders,
  UserModel,
} from '../interface/user.interface';

const FullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const AddressSchema = new Schema<Address>({
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

const OrdersSchema = new Schema<Orders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const UserSchema = new Schema<IUser, UserModel>({
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
  orders: OrdersSchema,
});

UserSchema.post('save', function (doc, next) {
  // doc.password = undefined;
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

UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
