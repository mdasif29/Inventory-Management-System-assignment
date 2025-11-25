const { Product, Category, AuditLog } = require('../models');
const { Op } = require('sequelize');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            [Op.or]: [
                { name: { [Op.like]: `%${req.query.keyword}%` } },
                { sku: { [Op.like]: `%${req.query.keyword}%` } }
            ]
        }
        : {};

    const categoryFilter = req.query.category ? { categoryId: req.query.category } : {};

    let stockFilter = {};
    if (req.query.stockStatus === 'low') {
        stockFilter = { stock: { [Op.lt]: 10, [Op.gt]: 0 } };
    } else if (req.query.stockStatus === 'out') {
        stockFilter = { stock: 0 };
    } else if (req.query.stockStatus === 'in') {
        stockFilter = { stock: { [Op.gte]: 10 } };
    }

    const priceFilter = {};
    if (req.query.minPrice && req.query.maxPrice) {
        priceFilter.price = { [Op.between]: [req.query.minPrice, req.query.maxPrice] };
    }

    const where = {
        ...keyword,
        ...categoryFilter,
        ...stockFilter,
        ...priceFilter,
        isDeleted: false
    };

    const count = await Product.count({ where });
    const products = await Product.findAll({
        where,
        include: [{ model: Category, attributes: ['name'] }],
        limit: pageSize,
        offset: pageSize * (page - 1),
        order: [['createdAt', 'DESC']]
    });

    res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res) => {
    const product = await Product.findOne({
        where: { id: req.params.id, isDeleted: false },
        include: [{ model: Category }]
    });

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin/Manager
const createProduct = async (req, res) => {
    const { name, sku, price, stock, categoryId, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const product = await Product.create({
            name,
            sku,
            price,
            stock,
            categoryId,
            imageUrl: image,
            description
        });

        await AuditLog.create({
            action: 'CREATE',
            entity: 'Product',
            entityId: product.id,
            userId: req.user.id,
            details: `Created product ${name}`
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin/Manager
const updateProduct = async (req, res) => {
    const { name, sku, price, stock, categoryId, description } = req.body;
    const product = await Product.findOne({ where: { id: req.params.id, isDeleted: false } });

    if (product) {
        product.name = name || product.name;
        product.sku = sku || product.sku;
        product.price = price || product.price;
        product.stock = stock !== undefined ? stock : product.stock;
        product.categoryId = categoryId || product.categoryId;
        product.description = description || product.description;
        if (req.file) {
            product.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await product.save();

        await AuditLog.create({
            action: 'UPDATE',
            entity: 'Product',
            entityId: product.id,
            userId: req.user.id,
            details: `Updated product ${product.name}`
        });

        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product (Soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin/Manager
const deleteProduct = async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.id } });

    if (product) {
        product.isDeleted = true;
        await product.save();

        await AuditLog.create({
            action: 'DELETE',
            entity: 'Product',
            entityId: product.id,
            userId: req.user.id,
            details: `Soft deleted product ${product.name}`
        });

        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Update stock
// @route   PUT /api/products/:id/stock
// @access  Private/Admin/Manager
const updateStock = async (req, res) => {
    const { quantity, reason, type } = req.body; // type: 'increment' or 'decrement'
    const product = await Product.findOne({ where: { id: req.params.id, isDeleted: false } });

    if (product) {
        if (type === 'increment') {
            product.stock += Number(quantity);
        } else if (type === 'decrement') {
            product.stock -= Number(quantity);
        }

        await product.save();

        await AuditLog.create({
            action: 'STOCK_UPDATE',
            entity: 'Product',
            entityId: product.id,
            userId: req.user.id,
            details: `Stock ${type} by ${quantity}. Reason: ${reason}`
        });

        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock
};
