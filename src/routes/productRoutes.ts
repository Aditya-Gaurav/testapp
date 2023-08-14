import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../controllers/productController';

const router = express.Router();

// POST /api/products - Create a new product
router.post('/', createProduct);

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get a specific product by ID
router.get('/:id', getProductById);

// PUT /api/products/:id - Update a product by ID
router.put('/:id', updateProductById);

// DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', deleteProductById);

export default router;
