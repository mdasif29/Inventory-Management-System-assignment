const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, AuditLog } = require('../models');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, isDeleted: false } });

    if (user && (await bcrypt.compare(password, user.password))) {
        if (user.isBlocked) {
            return res.status(401).json({ message: 'User is blocked' });
        }

        generateToken(res, user.id);

        await AuditLog.create({
            action: 'LOGIN',
            entity: 'User',
            entityId: user.id,
            userId: user.id,
            details: 'User logged in'
        });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Internal use for seeding
const registerUser = async (req, res) => {
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
        role
    });

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

module.exports = { loginUser, logoutUser, registerUser };
