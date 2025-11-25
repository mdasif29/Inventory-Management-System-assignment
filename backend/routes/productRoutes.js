const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateStock
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, getProducts)
    .post(protect, authorize('admin', 'manager'), upload.single('image'), createProduct);

router.route('/:id')
    .get(protect, getProductById)
    .put(protect, authorize('admin', 'manager'), upload.single('image'), updateProduct)
    .delete(protect, authorize('admin', 'manager'), deleteProduct);

router.route('/:id/stock')
    .put(protect, authorize('admin', 'manager'), updateStock);

module.exports = router;
