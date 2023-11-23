import { IUser } from '../interface/user.interface';
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
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (userId: number, userData: IUser) => {
  const result = await User.updateOne({ userId }, userData);
  return result;
};

const deleteUser = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
