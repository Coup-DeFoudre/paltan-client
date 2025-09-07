'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-6 text-reveal">द पल्टन</h1>
      <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
        Jahan Khabar sirf headlines nahi hoti, ek samajh bhi hoti hai.
      </p>
    </motion.section>
  );
}
