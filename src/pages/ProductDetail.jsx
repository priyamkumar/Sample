import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Truck, ShieldCheck, Package } from 'lucide-react';
import axios from 'axios';
import { getProductById } from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be fetched from your MongoDB backend
        // For demo purposes, we'll use mock data
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!id) throw new Error('Product ID is required');
        
        const productId = parseInt(id);
        
        // Mock product data
        const res = await getProductById(id);
        let mockProduct = res.product;
        setProduct(mockProduct);
        setSelectedImage(mockProduct.image);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  // Display stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starFill = index + 1 <= Math.floor(rating) 
        ? 'text-yellow-400' 
        : index + 0.5 <= rating 
          ? 'text-yellow-400 opacity-50' 
          : 'text-gray-300';
      
      return (
        <Star 
          key={index} 
          className={`h-5 w-5 ${starFill}`} 
          fill={index + 1 <= Math.floor(rating) ? 'currentColor' : 'none'} 
        />
      );
    });
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="bg-red-50 text-red-700 p-8 rounded-lg text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p>{error || 'Product not found'}</p>
            <Link to="/products" className="btn btn-primary mt-4">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary-600 transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-soft mb-4 h-96">
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.additionalImages && (
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => setSelectedImage(product.image)}
                  className={`rounded-lg overflow-hidden h-24 ${selectedImage === product.image ? 'ring-2 ring-primary-500' : ''}`}
                >
                  <img 
                    src={product.image} 
                    alt={`${product.name} - Main`}
                    className="w-full h-full object-cover"
                  />
                </button>
                {product.additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-lg overflow-hidden h-24 ${selectedImage === img ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-2 py-1 bg-blue-100 text-primary-600 rounded-md text-xs font-medium mb-4">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500">
                ({product.rating.toFixed(1)}) • 24 Reviews
              </span>
            </div>

            <div className="text-2xl font-bold text-primary-600 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-700 mb-6">
              {product.fullDescription || product.description}
            </p>

            {/* Product Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center max-w-xs">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      setQuantity(val);
                    }
                  }}
                  className="py-2 px-3 border-t border-b border-gray-300 w-16 text-center focus:outline-none focus:ring-0"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn btn-primary flex-1">
                Add to Cart
              </button>
              <button className="btn bg-secondary-900 hover:bg-secondary-800 text-white focus:ring-secondary-500 flex-1">
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary-50 rounded-full p-2 mr-3 flex-shrink-0">
                  <Truck className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary-900">Free Shipping</h3>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-50 rounded-full p-2 mr-3 flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary-900">2-Year Warranty</h3>
                  <p className="text-xs text-gray-500">Full coverage for peace of mind</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-50 rounded-full p-2 mr-3 flex-shrink-0">
                  <Package className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary-900">Easy Returns</h3>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Specifications */}
        {product.specs && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Specifications</h2>
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <table className="min-w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-6 text-secondary-900 font-medium">{key}</td>
                      <td className="py-3 px-6 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="card group">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={`https://images.pexels.com/photos/${310000 + ((product.id + item) * 167)}/pexels-photo-${310000 + ((product.id + item) * 167)}.jpeg`}
                    alt={`Related product ${item}`} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/products/${product.id + item}`} className="bg-white text-secondary-900 px-3 py-1 rounded-md text-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-medium mb-1 text-secondary-900">Premium Product {product.id + item}</h3>
                  <div className="flex items-center mb-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3.5 w-3.5 ${idx < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                  <div className="text-primary-600 font-semibold">${(39.99 + item * 5).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;