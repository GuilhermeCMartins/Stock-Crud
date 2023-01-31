import User from "./User";

export default class Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    username: string;
 
    private static nextId = 1;
 
    constructor(name: string, price: number, quantity: number, username: string) {
        this.id = Item.nextId++;
        this.name = name;
        this.price = price;
        this.username = username;
        this.quantity = quantity;
    }
}