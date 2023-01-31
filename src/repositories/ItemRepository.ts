import User from 'src/models/User';
import Item from '../models/Item';
 
const items: Item[] = [];
 
async function getItem(id: number): Promise<Item | undefined> {
    return new Promise((resolve, reject) => {
        return resolve(items.find(i => i.id === id));
    })
}
 
async function getItems(): Promise<Item[]> {
    return new Promise((resolve, reject) => {
        return resolve(items);
    })
}

async function addItem(item: Item, user: string): Promise<Item> {
    return new Promise((resolve, reject) => {
        if (!item.name || !item.price || !item.quantity || !user)  return reject(new Error(`Invalid item.`));
 
        const newItem = new Item(item.name, item.price, item.quantity, user);
        items.push(newItem);
 
        return resolve(newItem);
    })
}
 
async function updateItem(id: number, newItem: Item): Promise<Item | undefined> {
    return new Promise((resolve, reject) => {
        const index = items.findIndex(i => i.id  === id);
        if (index + 1 ) {
            if (newItem.name && items[index].name !== newItem.name)
                items[index].name = newItem.name;
 
            if (newItem.price && items[index].price !== newItem.price)
                items[index].price = newItem.price;
            
            if(newItem.quantity && items[index].quantity !== newItem.quantity)
                items[index].quantity = newItem.quantity;
            return resolve(items[index]);
        }
 
        return resolve(undefined);
    })
}
 
async function deleteItem(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const index = items.findIndex(i => i.id === id);
        if (index + 1) {
            items.splice(index, 1);
            return resolve(true);
        }
 
        return resolve(false);
    })
}

async function totalValue(): Promise<Number> {
    return new Promise((resolve, reject) => {
        const totalValue = items.reduce((sum, item) => sum + item.price, 0);
        return resolve(totalValue);
    })
}

async function totalInStock(): Promise<Number> {
    return new Promise((resolve, reject) => {
        const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
        return resolve(totalStock);
    })
}
 
export default {
    getItem,
    getItems,
    deleteItem,
    addItem,
    updateItem,
    totalValue,
    totalInStock
}