import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-primary-50 inline-flex rounded-full p-4 mb-8"
          >
            <AlertTriangle size={40} className="text-primary-600" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            404
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/" className="btn btn-primary">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Link to="/products" className="btn bg-white border-gray-300 text-secondary-900 hover:bg-gray-50">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;