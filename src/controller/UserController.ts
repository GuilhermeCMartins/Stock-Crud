import { Request, Response, NextFunction } from 'express';
import User from "../models/User";
import UserRepository from '../repositories/UserRepository';
import jwt from 'jsonwebtoken'

async function postUser(req: Request, res: Response) {
    const user = req.body as User;
    const result = await UserRepository.registerUser(user);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchUser(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.body as User;
    const result = await UserRepository.updateUser(parseInt(id), user);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
}


async function deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    const success = await UserRepository.deleteUser(parseInt(id));
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
}

async function getUsers(req: Request, res: Response) {
    const users = await UserRepository.getUsers();
    res.json(users);
}


async function loginUser(req: Request, res: Response){
    const {email, password} =  req.body as User;

    if(!email || !password){
        return res.status(401).json({
            errors:['Inputs are invalid.']
        })
    }

    const user = await UserRepository.findOne(email);

    if(!user){
        return res.status(401).json({
            errors:['User does not exist.']
        })
    }

    if(password !== user.password){
        return res.status(401).json({
            errors:['Password does not match.']
        })
    }

    const {id} = user;

    const token = jwt.sign({ id, email },"iasdojdasjdaij", {
        expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({token, user: { username : user.username , id , email}})
}

export default{
    postUser,
    patchUser,
    deleteUser,
    getUsers,
    loginUser
}