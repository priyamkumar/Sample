import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, limit = 12, page = 1 } = req.query;
    
    const queryObject = {};
    
    if (category && category !== 'all') {
      queryObject.category = category;
    }
    
    if (search) {
      queryObject.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    let query = Product.find(queryObject);
    
    if (sort) {
      const sortMap = {
        'price-asc': { price: 1 },
        'price-desc': { price: -1 },
        'newest': { createdAt: -1 },
        'rating': { rating: -1 }
      };
      
      query = query.sort(sortMap[sort] || { createdAt: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit));
    
    const products = await query;
    const totalProducts = await Product.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalProducts / Number(limit));
    
    res.status(200).json({
      success: true,
      products,
      totalProducts,
      numOfPages,
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Invalid data', 
      error: error.message 
    });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid data',
      error: error.message
    });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

export default router;