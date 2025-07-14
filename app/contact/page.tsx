'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-red-600 text-white py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              संपर्क करें
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              हमसे जुड़ें और अपनी प्रतिक्रिया साझा करें
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MapPin className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">मुख्य कार्यालय</h3>
              <p className="text-gray-600 mb-2">21, प्रेस कॉम्प्लेक्स</p>
              <p className="text-gray-600 mb-2">इंदौर, मध्य प्रदेश</p>
              <p className="text-gray-600">452001</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Mail className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">ईमेल</h3>
              <a href="mailto:contact@paltannews.com" className="text-red-600 hover:text-red-700 block mb-2">
                contact@paltannews.com
              </a>
              <a href="mailto:news@paltannews.com" className="text-red-600 hover:text-red-700 block">
                news@paltannews.com
              </a>
              <p className="text-gray-600 mt-4">24x7 समाचार और सुझाव के लिए</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Phone className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">फ़ोन</h3>
              <p className="text-gray-900 font-medium mb-2">टोल फ्री नंबर:</p>
              <p className="text-red-600 text-xl font-bold mb-4">1800-XXX-XXXX</p>
              <p className="text-gray-600">सोमवार से शनिवार</p>
              <p className="text-gray-600">सुबह 9:00 से शाम 6:00 बजे तक</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gray-50 rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">हमें संदेश भेजें</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">नाम</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ईमेल</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">विषय</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">संदेश</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  संदेश भेजें
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            क्षेत्रीय कार्यालय
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">दिल्ली कार्यालय</h3>
              <p className="text-gray-600 mb-2">कनॉट प्लेस</p>
              <p className="text-gray-600">नई दिल्ली</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">मुंबई कार्यालय</h3>
              <p className="text-gray-600 mb-2">अंधेरी ईस्ट</p>
              <p className="text-gray-600">मुंबई</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">पटना कार्यालय</h3>
              <p className="text-gray-600 mb-2">फ्रेजर रोड</p>
              <p className="text-gray-600">पटना</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
