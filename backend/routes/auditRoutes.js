const express = require('express');
const router = express.Router();
const { AuditLog, User } = require('../models');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), async (req, res) => {
    const logs = await AuditLog.findAll({
        include: [{ model: User, attributes: ['name', 'email'] }],
        order: [['createdAt', 'DESC']],
        limit: 50
    });
    res.json(logs);
});

module.exports = router;
