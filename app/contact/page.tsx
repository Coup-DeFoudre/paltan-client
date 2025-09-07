'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';
import ErrorBoundary from '@/components/ErrorBoundary';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setStatusMessage('कृपया सभी फील्ड भरें');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage('धन्यवाद! आपका संदेश भेजा गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'कुछ गलत हुआ। कृपया दोबारा कोशिश करें।');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('कुछ गलत हुआ। कृपया दोबारा कोशिश करें।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                संपर्क करें
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                हमसे जुड़ें और अपनी प्रतिक्रिया साझा करें
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Information */}
        <ErrorBoundary>
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Office Location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <PremiumCard glowColor="amber" className="h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">मुख्य कार्यालय</h3>
                      <div className="text-slate-300 space-y-1">
                        <p>21, प्रेस कॉम्प्लेक्स</p>
                        <p>इंदौर, मध्य प्रदेश</p>
                        <p className="text-slate-400">452001</p>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="h-full"
                >
                  <PremiumCard glowColor="amber" className="h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">ईमेल</h3>
                      <div className="space-y-2">
                        <a 
                          href="mailto:thepaltann@gmail.com" 
                          className="block text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          thepaltann@gmail.com
                        </a>
                        <p className="text-slate-400 text-sm">24x7 समाचार और सुझाव के लिए</p>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="h-full"
                >
                  <PremiumCard glowColor="green" className="h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Phone className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">फ़ोन</h3>
                      <div className="space-y-2">
                        <p className="text-green-400 text-xl font-bold">1800-XXX-XXXX</p>
                        <p className="text-slate-400 text-sm">सोमवार से शनिवार</p>
                        <p className="text-slate-400 text-sm">सुबह 9:00 से शाम 6:00 बजे तक</p>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              </div>
            </div>
          </section>
        </ErrorBoundary>

        {/* Contact Form */}
        <ErrorBoundary>
          <section className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <PremiumCard glowColor="teal">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">हमें संदेश भेजें</h2>
                    <p className="text-slate-400">हम आपकी बात सुनने के लिए तैयार हैं</p>
                  </div>

                  {submitStatus === 'success' ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">संदेश भेजा गया!</h3>
                      <p className="text-slate-300">{statusMessage}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            नाम <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300"
                            placeholder="आपका पूरा नाम"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            ईमेल <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          विषय <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300"
                          placeholder="संदेश का विषय"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          संदेश <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-300 resize-none"
                          placeholder="अपना संदेश यहाँ लिखें..."
                        />
                      </div>

                      {submitStatus === 'error' && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 text-sm">{statusMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-slate-900 rounded-lg font-semibold transition-colors"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'भेजा जा रहा है...' : 'संदेश भेजें'}
                      </button>
                    </form>
                  )}
                </PremiumCard>
              </motion.div>
            </div>
          </section>
        </ErrorBoundary>

        {/* Regional Offices */}
        <ErrorBoundary>
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">क्षेत्रीय कार्यालय</h2>
                <p className="text-slate-400">हमारे विस्तृत नेटवर्क से जुड़ें</p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <PremiumCard glowColor="teal" className="h-full text-center">
                    <h3 className="text-lg font-bold text-white mb-3">दिल्ली कार्यालय</h3>
                    <div className="text-slate-300 space-y-1">
                      <p>कनॉट प्लेस</p>
                      <p>नई दिल्ली</p>
                      <p className="text-slate-400 text-sm">राष्ट्रीय समाचार केंद्र</p>
                    </div>
                  </PremiumCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="h-full"
                >
                  <PremiumCard glowColor="purple" className="h-full text-center">
                    <h3 className="text-lg font-bold text-white mb-3">मुंबई कार्यालय</h3>
                    <div className="text-slate-300 space-y-1">
                      <p>अंधेरी ईस्ट</p>
                      <p>मुंबई</p>
                      <p className="text-slate-400 text-sm">महाराष्ट्र ब्यूरो</p>
                    </div>
                  </PremiumCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="h-full"
                >
                  <PremiumCard glowColor="green" className="h-full text-center">
                    <h3 className="text-lg font-bold text-white mb-3">पटना कार्यालय</h3>
                    <div className="text-slate-300 space-y-1">
                      <p>फ्रेजर रोड</p>
                      <p>पटना</p>
                      <p className="text-slate-400 text-sm">बिहार ब्यूरो</p>
                    </div>
                  </PremiumCard>
                </motion.div>
              </div>
            </div>
          </section>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ContactPage;