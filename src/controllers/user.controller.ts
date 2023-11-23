/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from '../services/user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.createUser(userData);
    res.status(200).json({
      success: 'true',
      message: 'user created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'something went wrong',
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: 'true',
      message: 'allUser fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userServices.getSingleUser(userId);
    res.status(200).json({
      success: 'true',
      message: 'single user fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userData = req.body;
    const result = await userServices.updateUser(userId, userData);
    res.status(200).json({
      success: 'true',
      message: ' user updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userServices.deleteUser(userId);
    res.status(200).json({
      success: 'true',
      message: ' user deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
