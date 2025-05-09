import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, Zap } from 'lucide-react';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      bio: 'Sarah founded ElegantStore with a vision to provide high-quality products at reasonable prices. Her background in product design helps shape our selection.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Product Officer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Michael brings 10+ years of experience in product curation and quality assurance, ensuring we only offer the best products to our customers.'
    },
    {
      name: 'Emily Chen',
      role: 'Head of Customer Experience',
      image: 'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg',
      bio: 'Emily leads our customer service team with a customer-first approach, ensuring every interaction with ElegantStore exceeds expectations.'
    },
    {
      name: 'David Williams',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'David oversees our technology infrastructure and online presence, making sure your shopping experience is smooth and secure.'
    }
  ];

  const coreValues = [
    { 
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: 'Quality',
      description: 'We never compromise on quality, ensuring every product meets our rigorous standards.'
    },
    { 
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: 'Innovation',
      description: 'We constantly seek new products and technologies to improve our offerings.'
    },
    { 
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: 'Customer Focus',
      description: 'Our customers are at the center of everything we do.'
    },
    { 
      icon: <Target className="h-8 w-8 text-primary-600" />,
      title: 'Integrity',
      description: 'We operate with transparency and honesty in all our business practices.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-28">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                Our Story
              </h1>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p>
                  Founded in 2020, ElegantStore was born from a simple idea: to create a curated shopping experience that prioritizes quality, design, and customer satisfaction.
                </p>
                <p>
                  What started as a small operation has grown into a thriving online marketplace, connecting customers with carefully selected products that enhance daily life.
                </p>
                <p>
                  Our mission is to provide exceptional products and create lasting relationships with our customers, suppliers, and community.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg" 
                  alt="Our team working" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            {...fadeIn}
          >
            <span className="uppercase tracking-wider text-sm font-medium text-primary-600">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-secondary-900">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do at ElegantStore.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-soft text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.5 }}
              >
                <div className="flex justify-center mb-4 bg-primary-50 w-16 h-16 rounded-full items-center mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            {...fadeIn}
          >
            <span className="uppercase tracking-wider text-sm font-medium text-primary-600">The People Behind Our Success</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-secondary-900">Our Team</h2>
            <p className="text-lg text-gray-600">
              Meet the talented individuals who make ElegantStore possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.5 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;