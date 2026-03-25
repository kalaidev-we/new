const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};
        
        const products = await Product.find({ ...keyword }).populate('category', 'name');
        res.json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

const createProduct = async (req, res) => {
    const { name, price, description, category, stock } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
        name,
        price,
        description,
        category,
        image,
        stock
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400);
        throw new Error(error.message || 'Invalid product data');
    }
};

const updateProduct = async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            
            if (req.file) {
                product.image = `/uploads/${req.file.filename}`;
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
