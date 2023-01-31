import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UserRepository';



export async function authLogin(req: Request, res:Response, next: NextFunction) {
    interface JWTData {
        email: string;
        id: number;
    }
    
    const { authorization } = req.headers;
   

    if(!authorization){
        return res.status(401).json({
            errors:['Login required.']
        })
    }

    const [ bearer, token] = authorization.split(' ');

    

    const data = jwt.verify(token, "iasdojdasjdaij");

    const email = (data as JWTData).email;
    const id = (data as JWTData).id;

    const user  = await UserRepository.findOne(email);

    if(!user){
        return res.status(401).json({
            errors:['Invalid user.']
        })
    }
   
    
    next();
   
}