import express from 'express';
import {
  createProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant,
} from '../controllers/productVariantController';

const router = express.Router();

// Create a new product variant
router.post('/product-variants', createProductVariant);

// Get all product variants
router.get('/product-variants', getAllProductVariants);

// Get a single product variant by ID
router.get('/product-variants/:id', getProductVariantById);

// Update a product variant by ID
router.put('/product-variants/:id', updateProductVariant);

// Delete a product variant by ID
router.delete('/product-variants/:id', deleteProductVariant);

export default router;
