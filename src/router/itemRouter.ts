import express from 'express';
import itemController from '../controller/itemController';
import { authLogin } from '../middlewares/authLogin'

const router = express.Router();

router.get('/:id',authLogin, itemController.getItem);

router.get('/',authLogin, itemController.getItems);

router.post('/', authLogin ,  itemController.postItem);

router.patch('/:id',authLogin, itemController.patchItem);

router.delete('/:id',authLogin, itemController.deleteItem);

export default router;
