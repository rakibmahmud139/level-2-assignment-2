/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import UserValidationSchema from './user.validation';
import { userServices } from './user.services';

//createUser
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = UserValidationSchema.parse(userData);
    const result = await userServices.createUser(zodParseData);
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

//getAllUser
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

//getSingleUser
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

//updateUser
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

//deleteUser
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

//addProductInOrder
const addProductInOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const productData = req.body;
    const result = await userServices.addProductInOrder(userId, productData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

//getUserOrders
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userServices.getUserOrders(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: result,
      },
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

//getTotalPriceInOrders
const getTotalPriceInOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userServices.getTotalPriceInOrders(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
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
  addProductInOrder,
  getUserOrders,
  getTotalPriceInOrders,
};
