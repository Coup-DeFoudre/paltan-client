'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Globe, Newspaper } from 'lucide-react';
import Cookies from 'js-cookie';
import Orb from './Orb';

interface WelcomeGateProps {
  children: React.ReactNode;
}

export default function WelcomeGate({ children }: WelcomeGateProps) {
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const welcomeSeen = Cookies.get('paltan_welcome_seen') === 'true';
    setHasSeenWelcome(welcomeSeen);
    
    if (!welcomeSeen) {
      setShowWelcome(true);
    }
  }, []);

  const handleStartReading = () => {
    Cookies.set('paltan_welcome_seen', 'true', { 
      expires: 365 * 10, // 10 years
      sameSite: 'strict'
    });
    setShowWelcome(false);
    setHasSeenWelcome(true);
  };

  // Show loading state while checking cookies
  if (hasSeenWelcome === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen relative overflow-hidden bg-slate-950"
        >
          {/* React Bits Orb Background - Fixed Position */}
          <div className="fixed inset-0 opacity-40 pointer-events-none">
            <Orb
              hue={30}
              hoverIntensity={0.2}
              rotateOnHover={true}
              forceHoverState={false}
            />
          </div>
          
          {/* Welcome Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16 pt-20 md:pt-16 font-poppins">
            <div className="max-w-4xl mx-auto text-center">
              
              {/* Welcome Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mb-8"
                >
                  <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight font-poppins">
                    द पल्टन
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6"></div>
                  <p className="text-xl md:text-2xl text-slate-300 mb-4 font-light font-poppins">
                    में आपका स्वागत है
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8 font-poppins"
                >
                  Jahan Khabar sirf headlines nahi hoti, ek samajh bhi hoti hai.
                  <br />
                  <span className="text-slate-300">सच्ची, संतुलित और संवेदनशील पत्रकारिता का मंच</span>
                </motion.p>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-100 mb-2 font-poppins">Thoughtful Journalism</h3>
                  <p className="text-slate-400 text-sm font-poppins">Khabar jo sirf fast nahi, farsighted bhi hoti hai</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <Globe className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-100 mb-2 font-poppins">Local to National</h3>
                  <p className="text-slate-400 text-sm font-poppins">Apne sheher se lekar desh tak ki har khabar</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center"
                >
                  <Newspaper className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-100 mb-2 font-poppins">Cultural Roots</h3>
                  <p className="text-slate-400 text-sm font-poppins">Dharma, sanskriti aur samaj ki gehri samajh</p>
                </motion.div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="space-y-6"
              >
                <button
                  onClick={handleStartReading}
                  className="group inline-flex items-center gap-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 font-poppins"
                >
                  <span>Start Reading</span>
                  <span className="text-slate-700">पढ़ना शुरू करें</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-slate-500 text-sm font-poppins">
                  By continuing, you accept our cookies for a better experience
                </p>
              </motion.div>

              {/* Bottom Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-16"
              >
                <blockquote className="text-slate-400 italic text-lg font-poppins">
                  &ldquo;Truth. Culture. People. That&apos;s our foundation.&rdquo;
                </blockquote>
                <p className="text-slate-500 text-sm mt-2 font-poppins">- The Paltan Team</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
