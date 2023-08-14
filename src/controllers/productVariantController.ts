import { Request, Response } from 'express';
import ProductVariantModel, { IProductVariant } from '../models/productVariant';

// Create a new product variant
export const createProductVariant = async (req: Request, res: Response) => {
  try {
    const newProductVariant: IProductVariant = req.body;
    const productVariant = await ProductVariantModel.create(newProductVariant);
    return res.status(201).json(productVariant);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create the product variant' });
  }
};

// Get all product variants
export const getAllProductVariants = async (req: Request, res: Response) => {
  try {
    const productVariants = await ProductVariantModel.find();
    return res.json(productVariants);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get the product variants' });
  }
};

// Get a single product variant by ID
export const getProductVariantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productVariant = await ProductVariantModel.findById(id);
    if (!productVariant) {
      return res.status(404).json({ error: 'Product variant not found' });
    }
    return res.json(productVariant);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get the product variant' });
  }
};

// Update a product variant by ID
export const updateProductVariant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedProductVariant: IProductVariant = req.body;
    const productVariant = await ProductVariantModel.findByIdAndUpdate(
      id,
      updatedProductVariant,
      { new: true }
    );
    if (!productVariant) {
      return res.status(404).json({ error: 'Product variant not found' });
    }
    return res.json(productVariant);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update the product variant' });
  }
};

// Delete a product variant by ID
export const deleteProductVariant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productVariant = await ProductVariantModel.findByIdAndRemove(id);
    if (!productVariant) {
      return res.status(404).json({ error: 'Product variant not found' });
    }
    return res.json({ message: 'Product variant deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete the product variant' });
  }
};
