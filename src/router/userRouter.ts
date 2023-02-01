import express from 'express';
import userController from '../controller/UserController';
import { authLogin } from '../middlewares/authLogin'

const userRouter = express.Router();

// userRouter.get('/', userController.getUsers);

userRouter.post('/',userController.postUser);

userRouter.post('/login',userController.loginUser);

userRouter.patch('/:id',authLogin, userController.patchUser);

userRouter.delete('/:id',authLogin, userController.deleteUser);

export default userRouter;