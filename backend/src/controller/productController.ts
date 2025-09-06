// /src/controllers/product.controller.ts

import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    // DANGER: req.body is not validated.
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, message: 'Product created successfully!', data: product });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'SKU must be unique.' });
    }
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    // DANGER: req.body is not validated.
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, message: 'Product updated successfully!', data: product });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, message: 'Product deleted successfully!', data: {} });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};