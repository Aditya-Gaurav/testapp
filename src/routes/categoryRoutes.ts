
import express from 'express';
import { createCategory, getCategories,getCategoryById, updateCategory, deleteCategory,fetchCategoriesWithSubcategory } from '../controllers/categoryController';

const router = express.Router();
console.log('hello')

// POST /api/orders - Place an order
router.post('/', createCategory);

// GET /api/orders - Get all orders
router.get('/', getCategories);
router.get('/filterCategory', fetchCategoriesWithSubcategory)
export default router;
