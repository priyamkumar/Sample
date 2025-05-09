import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { MapPin, Phone, Mail, CheckCircle, AlertTriangle } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this to your backend
      await axios.post('/api/contact', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset the status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary-600" />,
      title: 'Our Location',
      details: '123 Commerce St, New York, NY 10001',
    },
    {
      icon: <Phone className="h-6 w-6 text-primary-600" />,
      title: 'Phone Number',
      details: '(555) 123-4567',
    },
    {
      icon: <Mail className="h-6 w-6 text-primary-600" />,
      title: 'Email Address',
      details: 'info@elegantstore.com',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-100 text-primary-600 rounded-full text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team is always ready to assist with any inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-soft p-8 h-full">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary-50 rounded-full p-3 mr-4 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-secondary-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="font-medium text-lg text-secondary-900 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Friday: 9am - 6pm</p>
                    <p>Saturday: 10am - 4pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-soft p-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">Send Us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 bg-green-50 text-green-700 rounded-md p-4 flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>Thank you for your message! We'll get back to you as soon as possible.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 bg-red-50 text-red-700 rounded-md p-4 flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>There was an error sending your message. Please try again later.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-900 mb-1">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-900 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-900 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className={`input ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                      {...register('subject', { required: 'Subject is required' })}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-900 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`input resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                      {...register('message', { required: 'Message is required' })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Visit Our Store
            </h2>
            <p className="text-lg text-gray-600">
              Come and explore our products in person at our flagship store in New York City.
            </p>
          </motion.div>
          
          <motion.div 
            className="rounded-xl overflow-hidden shadow-lg h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* In a real application, this would be a proper map integration */}
            <div className="relative w-full h-full bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg"
                alt="Store location map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/30 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-sm text-center">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    ElegantStore NYC
                  </h3>
                  <p className="text-gray-600 mb-4">
                    123 Commerce St, New York, NY 10001
                  </p>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1442.1396677876987!2d76.76337137990716!3d30.71824556931041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1746780877772!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;