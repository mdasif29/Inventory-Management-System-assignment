const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, toggleBlockUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin'), getUsers)
    .post(protect, authorize('admin'), createUser);

router.route('/:id')
    .put(protect, authorize('admin'), updateUser);

router.route('/:id/block')
    .put(protect, authorize('admin'), toggleBlockUser);

module.exports = router;
