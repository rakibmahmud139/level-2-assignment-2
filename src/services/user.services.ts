import { IUser, Orders } from '../interface/user.interface';
import User from '../models/user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (userId: number, userData: IUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.updateOne({ userId }, userData);
  return result;
};

const deleteUser = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

const addProductInOrder = async (
  userId: number,
  productData: Orders,
): Promise<Orders[]> => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(productData);

  // await user.save();
  return user.orders;
};

const getUserOrders = async (userId: number): Promise<Orders[]> => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user.orders || [];
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addProductInOrder,
  getUserOrders,
};
