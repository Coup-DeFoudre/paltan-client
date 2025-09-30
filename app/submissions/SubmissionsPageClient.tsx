'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Paperclip, ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SubmissionsPageClient() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reporterName: '',
    contact: '',
    driveLink: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setStatusMessage('कृपया कंटेंट का शीर्षक भरें');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return false;
    }
    if (!formData.description.trim()) {
      setStatusMessage('कृपया स्टोरी का विवरण भरें');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return false;
    }
    if (!formData.reporterName.trim()) {
      setStatusMessage('कृपया अपना नाम भरें');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return false;
    }
    if (!formData.contact.trim()) {
      setStatusMessage('कृपया संपर्क जानकारी भरें');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    try {
      const submissionData = {
        title: formData.title,
        description: formData.description,
        reporterName: formData.reporterName,
        contact: formData.contact,
        driveLink: formData.driveLink || null,
      };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message || 'धन्यवाद! आपका सबमिशन प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।');
        
        setFormData({
          title: '',
          description: '',
          reporterName: '',
          contact: '',
          driveLink: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'सबमिशन भेजने में त्रुटि हुई। कृपया दोबारा कोशिश करें।');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setStatusMessage('कुछ गलत हुआ। कृपया दोबारा कोशिश करें।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div className="mb-6">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Homepage</span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <MessageSquare className="w-10 h-10 text-green-500" />
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Reader Submissions
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-green-400 mb-4">
                पाठक योगदान
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                आपकी बात भी हो सकती है हेडलाइन – भेजिये अपना कंटेंट, हम देखेंगे।
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">सबमिशन सफल!</h3>
              <p className="text-xl text-slate-300 mb-8">{statusMessage}</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setSubmitStatus('idle');
                    setFormData({
                      title: '',
                      description: '',
                      reporterName: '',
                      contact: '',
                      driveLink: ''
                    });
                  }}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-slate-900 rounded-lg font-semibold transition-colors mr-4"
                >
                  नया सबमिशन भेजें
                </button>
                
                <Link 
                  href="/"
                  className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-medium transition-colors"
                >
                  होमपेज पर वापस जाएं
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 md:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-lg font-medium text-slate-300 mb-3">
                    कंटेंट का शीर्षक <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="अपने कंटेंट का टाइटल लिखें"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-300 mb-3">
                    स्टोरी का विवरण <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="अपनी स्टोरी का पूरा विवरण लिखें..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-300 mb-3">
                    रिपोर्टर का नाम <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.reporterName}
                    onChange={(e) => handleInputChange('reporterName', e.target.value)}
                    placeholder="आपका पूरा नाम"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-300 mb-3">
                    संपर्क जानकारी <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="ईमेल या फोन नंबर"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-300 mb-3">
                    प्रूफ/अटैचमेंट (Google Drive Link)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.driveLink}
                      onChange={(e) => handleInputChange('driveLink', e.target.value)}
                      placeholder="https://drive.google.com/... (वैकल्पिक)"
                      className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                    />
                    <Paperclip className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    अगर आपके पास फोटो, डॉक्युमेंट्स या वीडियो प्रूफ हैं तो Google Drive लिंक शेयर करें
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-slate-900 rounded-lg font-bold text-lg transition-colors"
                >
                  <Send className="w-6 h-6" />
                  {isSubmitting ? 'भेजा जा रहा है...' : 'सबमिशन भेजें'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Confirmation Dialog */}
          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 max-w-md w-full"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">पुष्टि करें</h3>
                  <p className="text-slate-300 mb-6">
                    क्या आप वाकई अपना सबमिशन भेजना चाहते हैं?
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                    >
                      रद्द करें
                    </button>
                    <button
                      onClick={confirmSubmission}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-slate-900 rounded-lg font-semibold transition-colors"
                    >
                      {isSubmitting ? 'भेजा जा रहा है...' : 'हाँ, भेजें'}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}