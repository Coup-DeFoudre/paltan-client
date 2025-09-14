'use client';

import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Twitter, MessageCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      label: 'Instagram',
      url: 'https://instagram.com',
      color: 'hover:bg-pink-500/20 hover:text-pink-400'
    },
    {
      icon: <Youtube size={20} />,
      label: 'YouTube', 
      url: 'https://youtube.com',
      color: 'hover:bg-red-500/20 hover:text-red-400'
    },
    {
      icon: <Twitter size={20} />,
      label: 'Twitter',
      url: 'https://twitter.com',
      color: 'hover:bg-blue-500/20 hover:text-blue-400'
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      url: 'https://wa.me',
      color: 'hover:bg-green-500/20 hover:text-green-400'
    }
  ];

  return (
    <div className="fixed bottom-32 lg:bottom-8 right-4 z-40">
      <div className="flex flex-col items-end space-y-3">
        
        {/* Social Links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col space-y-3"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 50, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.5 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass-card p-3 rounded-full text-slate-300 transition-all duration-300 ${link.color} group shadow-lg`}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card p-4 rounded-full text-slate-300 hover:text-amber-400 transition-all duration-300 glow-amber shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Users size={24} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
