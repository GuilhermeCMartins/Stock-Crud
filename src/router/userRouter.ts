import express from 'express';
import userController from '../controller/UserController';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);

userRouter.post('/', userController.postUser);

userRouter.post('/login', userController.loginUser);

userRouter.patch('/:id', userController.patchUser);

userRouter.delete('/:id', userController.deleteUser);

export default userRouter;