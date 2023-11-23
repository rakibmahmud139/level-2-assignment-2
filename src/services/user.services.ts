import { IUser } from '../interface/user.interface';
import User from '../models/user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);
  return result;
};

const getAllUser = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
};
