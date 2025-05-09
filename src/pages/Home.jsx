import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, TrendingUp, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const featureItems = [
    {
      icon: <Truck className="w-10 h-10 text-primary-600" />,
      title: 'Free Shipping',
      description: 'Free shipping on all orders over $50'
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary-600" />,
      title: 'Secure Payments',
      description: 'All transactions are secure and encrypted'
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary-600" />,
      title: 'Quality Products',
      description: 'Handpicked items of the highest quality'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-gray-100 py-24 md:py-32">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                Premium Quality
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight mb-6">
                Discover Our <span className="text-primary-600">Exceptional</span> Products
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience the perfect blend of style, quality, and innovation with our curated collection of premium products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                  <ChevronRight className="ml-1 w-5 h-5" />
                </Link>
                <Link to="/about" className="btn bg-white text-secondary-900 border-gray-300 hover:bg-gray-50">
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative h-80 md:h-96 lg:h-[500px] w-full overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg" 
                  alt="Premium products showcase" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-md hidden md:block">
                <div className="flex items-center">
                  <div className="bg-accent rounded-full p-2 mr-3">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trusted by</p>
                    <p className="font-semibold">10,000+ customers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="hidden lg:block absolute top-32 right-10 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="hidden lg:block absolute bottom-10 left-20 w-72 h-72 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            {...fadeIn}
          >
            <span className="uppercase tracking-wider text-sm font-medium text-primary-600">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-secondary-900">The Benefits</h2>
            <p className="text-lg text-gray-600">
              We pride ourselves on providing the best products and services to our customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-secondary-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            {...fadeIn}
          >
            <span className="uppercase tracking-wider text-sm font-medium text-primary-600">Featured Collection</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-secondary-900">Popular Products</h2>
            <p className="text-lg text-gray-600">
              Discover our most loved items that customers can't get enough of.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                className="card group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * item, duration: 0.5 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://images.pexels.com/photos/10455${30 + item}/pexels-photo-10455${30 + item}.jpeg`}
                    alt={`Featured product ${item}`} 
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/products/${item}`} className="bg-white text-secondary-900 px-4 py-2 rounded-md transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1 text-secondary-900">Premium Product {item}</h3>
                  <p className="text-gray-500 mb-3">High-quality craftsmanship</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">${59 + item * 10}.99</span>
                    <Link to={`/products/${item}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                      Shop Now <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-primary">
              View All Products
              <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ready to experience our amazing products?
              </motion.h2>
              <motion.p 
                className="text-blue-100 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Join thousands of satisfied customers and discover why they choose us for their needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Explore Now
                  <ChevronRight className="ml-1 w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" 
                  alt="Happy customers" 
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-primary-900/20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;