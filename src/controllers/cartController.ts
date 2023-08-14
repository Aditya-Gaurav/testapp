import { Request, Response } from 'express';
import CartItem, { ICartItem } from '../models/cartModel';
import { AppError } from '../utils/errorHandler';
import mongoose, { Schema, Document } from 'mongoose';
import Product, { IProduct } from '../models/productModel';
import User, { IUser } from '../models/userModel';
// Add a product to the cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    // Validate productId and quantity
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new AppError('Invalid product ID', 400);
    }

    if (quantity <= 0) {
      throw new AppError('Quantity must be greater than 0', 400);
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Check if the item is already in the cart
    let cartItem: ICartItem | null = await CartItem.findOne({ product: productId });
    if (!cartItem) {
      // If not, create a new cart item
      cartItem = new CartItem({ product: productId, quantity });
    } else {
      // If yes, update the quantity
      cartItem.quantity += quantity;
    }

    // Save the cart item
    await cartItem.save();

    res.status(200).json(cartItem); 
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
  }
};

// Get all cart items
export const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const cartItems: ICartItem[] = await CartItem.find();
    res.json(cartItems);
  } catch (err: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;

    // Validate quantity
    if (quantity <= 0) {
      throw new AppError('Quantity must be greater than 0', 400);
    }

    // Check if the cart item exists
    const cartItem: ICartItem | null = await CartItem.findById(req.params.id);
    if (!cartItem) {
      throw new AppError('Cart item not found', 404);
    }

    // Update the quantity and save
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
  }
};

// Remove a cart item
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    // Check if the cart item exists
    const cartItem: ICartItem | null = await CartItem.findById(req.params.id);
    if (!cartItem) {
      throw new AppError('Cart item not found', 404);
    }

    // Delete the cart item
    await cartItem.remove();

    res.json({ message: 'Cart item removed successfully' });
  } catch (err:any) {
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
  }
};
