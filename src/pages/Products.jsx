import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';
import { getProducts } from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts()
      const mockProducts = res.products;
      setProducts(mockProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // Sample product categories
  const categories = ['all', 'electronics', 'home', 'fashion', 'accessories'];
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

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
          className={`h-4 w-4 ${starFill}`} 
          fill={index + 1 <= Math.floor(rating) ? 'currentColor' : 'none'} 
        />
      );
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover Our Products
            </motion.h1>
            <motion.p 
              className="text-lg text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Browse our carefully curated collection of premium items
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="input pr-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === category
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  {error}
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product._id}
                          className="card group"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * (index % 6), duration: 0.4 }}
                        >
                          <div className="relative overflow-hidden h-60">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Link to={`/products/${product._id}`} className="bg-white text-secondary-900 px-4 py-2 rounded-md transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View Details
                              </Link>
                            </div>
                            <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                              {product.category}
                            </div>
                          </div>
                          <div className="p-5">
                            <Link to={`/products/${product._id}`}>
                              <h3 className="text-lg font-semibold mb-1 text-secondary-900 hover:text-primary-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="flex items-center mb-2">
                              <div className="flex mr-2">
                                {renderStars(product.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                ({product.rating.toFixed(1)})
                              </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
                              <Link to={`/products/${product._id}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center text-sm">
                                Details <ChevronRight size={16} className="ml-1" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setActiveCategory('all');
                        }}
                        className="mt-4 btn btn-primary"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;