const Cart = require('./cart')
const db = require('../util/database')


module.exports = class Product {

    constructor(id, title, imageUrl, description, price, label) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.label = label;
        this.id = id;
    }


    save() {
        return db.execute('INSERT INTO products (title, label, price, description, imageUrl) VALUES (?,?,?,?,?)', [this.title, this.label, this.price, this.description, this.imageUrl]);
    }



    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }

    static deleteById(id) {

    }



}