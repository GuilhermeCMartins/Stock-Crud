import { Request, Response, NextFunction } from 'express';
import Item from '../models/Item';
import itemRepository from '../repositories/ItemRepository';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';


async function getItem(req: Request, res: Response) {
    const id = req.params.id;
    const item = await itemRepository.getItem(parseInt(id));
    if (item)
        res.json(item);
    else
        res.sendStatus(404);
}

async function getItems(req: Request, res: Response) {
    const items = await itemRepository.getItems();
    res.json(items);
}

async function postItem(req: Request, res: Response) {
    interface JWTData {
        email: string;
        id: number;
    }

    const { authorization } = req.headers;

    if(typeof authorization !== "string"){
        return res.sendStatus(400);
    }

    const [bearer, token] = authorization.split(' ');

    const data = jwt.verify(token, 'iasdojdasjdaij');

    const email = (data as JWTData).email;

    const userdata  = await UserRepository.findOne(email);

    const item = new Item(req.body.name, req.body.price, req.body.quantity, <string> userdata?.username);
    const result = await itemRepository.addItem(item, <string> userdata?.username);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchItem(req: Request, res: Response) {
    const id = req.params.id;
    const item = req.body as Item;
    const result = await itemRepository.updateItem(parseInt(id), item);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
}

async function deleteItem(req: Request, res: Response) {
    const id = req.params.id;
    const success = await itemRepository.deleteItem(parseInt(id));
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
}

export default {
    getItem,
    getItems,
    postItem,
    patchItem,
    deleteItem
}