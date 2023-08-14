import { Request, Response } from 'express';
import Order, { IOrder } from '../models/orderModel';
import { AppError } from '../utils/errorHandler';
import Product, { IProduct } from '../models/productModel';
import User, { IUser } from '../models/userModel';

import mongoose, { Schema, Document } from 'mongoose';

// Place an order
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, productIds } = req.body;

    // Validate userId and productIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError('Invalid user ID', 400);
    }

    if (!Array.isArray(productIds) || productIds.length === 0) {
      throw new AppError('Product IDs must be an array with at least one product', 400);
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if the products exist
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      throw new AppError('One or more products not found', 404);
    }

    // Create the order
    const order: IOrder = new Order({ user: userId, products: productIds });
    await order.save();

    res.status(201).json(order);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
  }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: IOrder[] = await Order.find().populate('user').populate('products');
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
