import express from 'express';
import {
  addToCart,
  getAllCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from '../controllers/cartController';

const router = express.Router();

// POST /api/cart - Add a product to the cart
router.post('/', addToCart);

// GET /api/cart - Get all cart items
router.get('/', getAllCartItems);

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', updateCartItemQuantity);

// DELETE /api/cart/:id - Remove a cart item
router.delete('/:id', removeCartItem);

export default router;
