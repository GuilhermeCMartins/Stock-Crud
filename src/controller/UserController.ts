import { Request, Response, NextFunction } from 'express';
import User from "../models/User";
import UserRepository from '../repositories/UserRepository';
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail';
import { jsonc } from 'jsonc';
import { authUser } from '../utils/authUser';


async function postUser(req: Request, res: Response) {
    const user = req.body as User;

    if(!user.email || !user.password || !user.username){
        return res.status(401).json('Inputs can not be empty.')
    }

    if(user.password.length < 5){
        return res.status(401).json('Password need 5 char')
    }

    if(user.username.length < 5){
        return res.status(401).json('Username need 5 char.')
    }

    if(!isEmail(user.email)){
        return res.status(401).json('Invalid email.')
    }

    const result = await UserRepository.registerUser(user).catch(e => jsonc.stringify(e));

    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchUser(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.body as User;

    if(!user.email || !user.password || !user.username){
        return res.status(401).json('Inputs can not be empty.')
    }

    if(user.password.length < 5){
        return res.status(401).json('Password need 5 char')
    }

    if(user.username.length < 5){
        return res.status(401).json('Username need 5 char.')
    }

    if(!isEmail(user.email)){
        return res.status(401).json('Invalid email.')
    }

    const { authorization } = req.headers;

    const userdata = await authUser(<string> authorization);

    if(userdata){
        if(userdata.id == parseInt(id)){
            const result = await UserRepository.updateUser(parseInt(id), user);
            res.json(result);
        }else{
            res.send('User dont have permission to edit this acc.')
        }
    }else{
        res.send('User does not exist.')
    }    
}


async function deleteUser(req: Request, res: Response) {
    const id = req.params.id;

    const { authorization } = req.headers;

    const user = await authUser(<string> authorization);

    if(user){
        if(user.id == parseInt(id)){
            const success = await UserRepository.deleteUser(parseInt(id));
            res.json(success);
        }else{
            res.send('User dont have permission to delete this acc.')
        }
    }else{
        res.send('User does not exist.')
    }

    
}

async function getUsers(req: Request, res: Response) {
    const users = await UserRepository.getUsers();
    res.json(users);
}


async function loginUser(req: Request, res: Response){
    const {email, password} =  req.body as User;

    if(!email || !password){
        return res.status(401).json('Inputs are invalid.')
    }

    const user = await UserRepository.findOne(email);

    if(!user){
        return res.status(401).json('User does not exist.')
    }

    if(password !== user.password){
        return res.status(401).json('Password does not match.')
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