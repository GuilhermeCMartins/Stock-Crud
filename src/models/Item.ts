import User from "./User";

export default class Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    register_by: string;
 
    private static nextId = 1;
 
    constructor(name: string, price: number, quantity: number, register_by: string) {
        this.id = Item.nextId++;
        this.name = name;
        this.price = price;
        this.register_by = register_by;
        this.quantity = quantity;
    }
}