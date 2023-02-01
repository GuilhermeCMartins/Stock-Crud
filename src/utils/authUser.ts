import User from "../models/User";
import UserRepository from "../repositories/UserRepository";
import jwt from 'jsonwebtoken';

export async function authUser(authorization: String): Promise<User | null>{
    
    interface JWTData {
        email: string;
    }


    if(typeof authorization !== "string"){
        return null;
    }

    const [bearer, token] = authorization.split(' ');

    const data = jwt.verify(token, 'iasdojdasjdaij');

    const email = (data as JWTData).email;

    const userdata  = await UserRepository.findOne(email);

    if(!userdata){
        return null;
    }

    return userdata;

}