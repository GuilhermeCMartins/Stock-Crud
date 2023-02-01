import { Request, Response } from 'express';
import Item from '../models/Item';
import itemRepository from '../repositories/ItemRepository';
import UserRepository from '../repositories/UserRepository';
import { jsonc } from 'jsonc';
import { authUser } from '../utils/authUser';


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
    const item = req.body as Item;
    const { authorization } = req.headers;

    const user = await authUser(<string> authorization);

    if(user){
        const email = user.email;
        const userdata  = await UserRepository.findOne(email);
        const result = await itemRepository.addItem(item, <string> userdata?.username).catch(e => jsonc.stringify(e));
        if (result)
            res.status(201).json(result);
         else
            res.sendStatus(400);
    }else{
        res.send("User has to be logged in.")
    }   
    
}

async function patchItem(req: Request, res: Response) {
    const id = req.params.id;
    const item = req.body as Item;
    const { authorization } =req.headers;

    const user = await authUser(<string> authorization);

   

    if(user){
        const newItem = new Item(item.name, item.price, item.quantity, <string> user.username);

        const result = await itemRepository.updateItem(parseInt(id), newItem);

        if (result)
            res.json(result);
        else
            res.sendStatus(404);
    }else{
        res.json("User has to be logged in.")
    }
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