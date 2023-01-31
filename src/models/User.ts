import Item from "./Item";

export default class User {
    id: number;
    username: string;
    email: string;
    password: string;
     
    private static nextId = 1;

    constructor(username: string, password: string, email: string) {
        this.id = User.nextId++; 
        this.username = username;
        this.password = password;
        this.email = email;
    }
}