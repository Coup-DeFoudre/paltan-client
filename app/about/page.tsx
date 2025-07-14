'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Target, 
  Newspaper,
  Globe,
  BarChart
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

const AboutPage = () => {
  const stats = [
    { number: "15M+", label: "मासिक पाठक" },
    { number: "28", label: "राज्यों में उपस्थिति" },
    { number: "24x7", label: "समाचार अपडेट" },
    { number: "100+", label: "पत्रकार" },
  ];

  const achievements = [
    {
      year: "2020",
      title: "इंदौर से शुरुआत",
      description: "मध्य प्रदेश के दिल से डिजिटल क्रांति की शुरुआत"
    },
    {
      year: "2021",
      title: "राष्ट्रीय विस्तार",
      description: "भारत के प्रमुख शहरों में विस्तार"
    },
    {
      year: "2022",
      title: "डिजिटल नेतृत्व",
      description: "भारत का सबसे तेज़ बढ़ता डिजिटल न्यूज़ प्लेटफॉर्म"
    },
    {
      year: "2023",
      title: "नई ऊंचाइयां",
      description: "15 मिलियन से अधिक मासिक पाठकों का आंकड़ा पार"
    }
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12 text-red-600" />,
      title: "निष्पक्ष पत्रकारिता",
      description: "सत्य और निष्पक्षता हमारी प्राथमिकता है"
    },
    {
      icon: <Globe className="w-12 h-12 text-red-600" />,
      title: "राष्ट्रीय दृष्टिकोण",
      description: "देश के हर कोने से खबरें और विश्लेषण"
    },
    {
      icon: <BarChart className="w-12 h-12 text-red-600" />,
      title: "डेटा-आधारित रिपोर्टिंग",
      description: "तथ्यों और आंकड़ों पर आधारित विश्लेषण"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-red-600 text-white py-24 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 opacity-20 bg-[url('/globe.svg')] bg-center bg-no-repeat bg-contain"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              पलटन न्यूज़
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              भारत का प्रमुख डिजिटल न्यूज़ प्लेटफॉर्म
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-3xl font-bold text-red-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">हमारी दृष्टि</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              पलटन न्यूज़ की शुरुआत इंदौर से हुई, एक ऐसे विचार के साथ जो आज भारत का प्रमुख डिजिटल न्यूज़ प्लेटफॉर्म बन चुका है। 
              हमारा लक्ष्य देश के हर नागरिक तक सटीक, निष्पक्ष और विश्वसनीय समाचार पहुंचाना है।
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-50 rounded-xl p-8"
                variants={scaleIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">हमारी यात्रा</h2>
            <p className="text-lg text-gray-600">इंदौर से राष्ट्रीय स्तर तक</p>
          </motion.div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.year}
                className="bg-white rounded-xl p-6 shadow-lg flex items-start space-x-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-24 flex-shrink-0">
                  <div className="text-2xl font-bold text-red-600">{achievement.year}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Presence Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">राष्ट्रीय उपस्थिति</h2>
            <p className="text-lg text-gray-600">देश भर में फैला हमारा नेटवर्क</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {["उत्तर भारत", "दक्षिण भारत", "पूर्वी भारत", "पश्चिमी भारत"].map((region, index) => (
              <motion.div
                key={region}
                className="bg-gray-50 rounded-xl p-6 text-center"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{region}</h3>
                <p className="text-red-600">24x7 कवरेज</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              आप का अपना न्यूज़ चैनल
            </h2>
            <p className="text-lg text-gray-600">
              पलटन न्यूज़ आपको देता है देश और दुनिया की हर खबर, निष्पक्ष और विश्वसनीय तरीके से।
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
