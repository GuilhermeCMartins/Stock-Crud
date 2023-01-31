import express from 'express';
import itemController from '../controller/itemController';
import { authLogin } from '../middlewares/authLogin'

const router = express.Router();

router.get('/:id', itemController.getItem);

router.get('/', itemController.getItems);

router.post('/', authLogin ,  itemController.postItem);

router.patch('/:id', itemController.patchItem);

router.delete('/:id', itemController.deleteItem);

export default router;
