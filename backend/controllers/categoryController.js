const { Category, AuditLog } = require('../models');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.create({ name, description });

        await AuditLog.create({
            action: 'CREATE',
            entity: 'Category',
            entityId: category.id,
            userId: req.user.id,
            details: `Created category ${name}`
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: 'Category creation failed', error: error.message });
    }
};

module.exports = { getCategories, createCategory };
