'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = Cookies.get('paltan_cookie_consent');
    if (!cookieChoice) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('paltan_cookie_consent', 'accepted', { 
      expires: 365,
      sameSite: 'strict'
    });
    setShowBanner(false);
  };

  const handleReject = () => {
    Cookies.set('paltan_cookie_consent', 'rejected', { 
      expires: 365,
      sameSite: 'strict'
    });
    setShowBanner(false);
  };

  const handleClose = () => {
    // Closing without choice = reject (minimal cookies)
    handleReject();
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50 p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon and Text */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-amber-500/20 p-2 rounded-xl flex-shrink-0">
                    <Cookie className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-1">
                      🍪 We use cookies to improve your experience
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                      By continuing, you agree to our{' '}
                      <a href="/privacy" className="text-amber-400 hover:text-amber-300 underline">
                        Privacy Policy
                      </a>{' '}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={handleReject}
                    className="flex-1 md:flex-none px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all duration-200"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 md:flex-none px-4 py-2.5 text-sm font-medium text-slate-900 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 md:relative md:top-auto md:right-auto p-2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

