import express from 'express';
import { placeOrder, getAllOrders } from '../controllers/orderController';

const router = express.Router();

// POST /api/orders - Place an order
router.post('/', placeOrder);

// GET /api/orders - Get all orders
router.get('/', getAllOrders);

export default router;
