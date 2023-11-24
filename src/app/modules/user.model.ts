import { Schema, model } from 'mongoose';
import {
  Address,
  FullName,
  IUser,
  Orders,
  UserModel,
} from './user/user.interface';

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
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
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
  orders: { type: [OrdersSchema], default: [] },
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.fullName._id;
  delete user.address._id;
  delete user.orders;
  delete user.__v;
  delete user._id;
  return user;
};

UserSchema.pre('find', function (next) {
  this.select('-_id');
  this.select('-password');
  this.select('-userId');
  this.select('-fullName._id');
  this.select('-address._id');
  this.select('-isActive');
  this.select('-hobbies');
  this.select('-orders');
  this.select('-__v');
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
