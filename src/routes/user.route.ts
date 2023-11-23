import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/orders', userController.addProductInOrder);
router.get('/:userId/orders', userController.getUserOrders);

export const userRouter = router;
