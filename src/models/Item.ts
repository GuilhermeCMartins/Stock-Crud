export default class Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
 
    private static nextId = 1;
 
    constructor(name: string, price: number, quantity: number) {
        this.id = Item.nextId++;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}