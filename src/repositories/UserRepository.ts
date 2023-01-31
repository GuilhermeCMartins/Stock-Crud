import User from "../models/User";

const users: User[] = [];

async function registerUser(user: User): Promise<User>{
    return new Promise ((resolve, reject) => {
        const newUser = new User(user.username, user.password,user.email )
        users.push(newUser);
        
        return resolve(newUser);
})
}

async function deleteUser(id:number): Promise<boolean>{
    return new Promise((resolve,reject) => {
        if(!id){
            reject("User does not exist")
        }
        const index = users.findIndex(u => u.id === id) + 1;

        users.splice(index,1);
        return resolve(true);
    })
}

async function updateUser(id:number, newUser: User): Promise<User | undefined>{
    return new Promise((resolve, reject) => {
        if(!id){
            reject("User does not exist")
        }
        const index = users.findIndex(u => u.id === id);

        if(index + 1){
            if(newUser.email && users[index].email !== newUser.email)
            users[index].email = newUser.email;
        
            if(newUser.username && users[index].username !== newUser.username)
            users[index].username = newUser.username;

            if(newUser.password && users[index].password !== newUser.password)
            users[index].password = newUser.password;

            return resolve(users[index]);
        }

        return resolve(undefined);
    })
}

async function getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        return resolve(users);
    })
}

async function findOne(email: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
        return resolve(users.find(e => e.email === email));
    })
}



export default {
    registerUser,
    deleteUser,
    updateUser,
    getUsers,
    findOne
}