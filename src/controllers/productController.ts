import { Request, Response } from 'express';
import Product, { IProduct } from '../models/productModel';
import logger from '../utils/logger'; // Import the logger
import { AppError } from '../utils/errorHandler'; // Import the AppError

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: IProduct = new Product(req.body);
    await product.save();
    logger.info(`Product created: ${product._id} - ${product.name}`);
    res.status(201).json(product);
  } catch (err:any) {
    logger.error(`Error creating product: ${err.message}`);
    throw new AppError('Could not create product', 500); // Throw AppError instance
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product by ID
export const updateProductById = async (req: Request, res: Response) => {
  try {
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product by ID
export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const deletedProduct: IProduct | null = await Product.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
