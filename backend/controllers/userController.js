const bcrypt = require('bcryptjs');
const { User, AuditLog } = require('../models');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.findAll({
        where: { isDeleted: false },
        attributes: { exclude: ['password'] }
    });
    res.json(users);
};

// @desc    Create a new manager
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'manager'
    });

    await AuditLog.create({
        action: 'CREATE',
        entity: 'User',
        entityId: user.id,
        userId: req.user.id,
        details: `Created user ${name} as ${role}`
    });

    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        await AuditLog.create({
            action: 'UPDATE',
            entity: 'User',
            entityId: user.id,
            userId: req.user.id,
            details: `Updated user ${user.name}`
        });

        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Block/Unblock user
// @route   PUT /api/users/:id/block
// @access  Private/Admin
const toggleBlockUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        user.isBlocked = !user.isBlocked;
        await user.save();

        await AuditLog.create({
            action: 'UPDATE',
            entity: 'User',
            entityId: user.id,
            userId: req.user.id,
            details: `${user.isBlocked ? 'Blocked' : 'Unblocked'} user ${user.name}`
        });

        res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}` });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { getUsers, createUser, updateUser, toggleBlockUser };
