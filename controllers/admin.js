const Product = require('../models/products');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};


//Post Admin Add Product
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const label = req.body.label;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price, label);
    product.save().then((result) => {
        res.redirect('/admin/product-list');
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })

};

//Admin Add Product
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit

    if (!editMode) {
        return res.redirect('/admin/product-list')
    }
    const prodId = req.params.productId;
    Product.fingById(prodId, product => {
        if (!product) {
            res.redirect('/admin/product-list')
        }

        res.render('admin/edit-product', {
            pageTitle: 'Admin - Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })

};


//Post Admin Edit Product
exports.postEditProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const label = req.body.label;
    const description = req.body.description;
    const productId = req.body.productId;


    const product = new Product(productId, title, imageUrl, description, price, label);
    product.save()
    res.redirect('/admin/product-list');
};



//Get All Products Admin
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows, fileData]) => {
        res.render('admin/products', {
            prods: rows,
            pageTitle: 'Admin - Product List',
            path: '/admin/products'
        });

    }).catch((err) => {
        console.log(err)
    });
};



//Post Admin Product Delete
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.deleteById(prodId)
    res.redirect('/admin/product-list');
};



//Get Product Details Page
exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.productId

    Product.findById(prodId).then(([product]) => {
        res.render('admin/product-details', {
            product: product[0],
            pageTitle: product[0].title,
            path: '/admin/products'
        });
    }).catch((err) => {
        console.log(err)
    });

};