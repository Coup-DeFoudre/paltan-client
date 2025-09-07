'use client';

import { motion } from 'framer-motion';

interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  quote: string;
  category: string;
  rating?: number;
  featured?: boolean;
  publishedAt: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'reader':
      return '👤';
    case 'journalist':
      return '📰';
    case 'academic':
      return '🎓';
    case 'community_leader':
      return '🏛️';
    case 'youth':
      return '🌟';
    case 'rural_voice':
      return '🌾';
    default:
      return '💬';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'reader':
      return 'border-blue-200/40 bg-blue-50/10';
    case 'journalist':
      return 'border-green-200/40 bg-green-50/10';
    case 'academic':
      return 'border-purple-200/40 bg-purple-50/10';
    case 'community_leader':
      return 'border-orange-200/40 bg-orange-50/10';
    case 'youth':
      return 'border-pink-200/40 bg-pink-50/10';
    case 'rural_voice':
      return 'border-yellow-200/40 bg-yellow-50/10';
    default:
      return 'border-slate-200/40 bg-slate-50/10';
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-sm ${
        i < rating ? 'text-yellow-400' : 'text-gray-300'
      }`}
    >
      ★
    </span>
  ));
};

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Hide the entire section if no testimonials are available
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Your Reviews/Testimonials</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden backdrop-blur-sm p-6 rounded-xl border-2 ${getCategoryColor(testimonial.category)} hover:bg-opacity-20 hover:border-opacity-60 transition-all duration-300 group shadow-lg hover:shadow-xl`}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl opacity-90 group-hover:opacity-100 transition-opacity">
                  {getCategoryIcon(testimonial.category)}
                </div>
                {testimonial.rating && (
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                )}
              </div>
              
              <blockquote className="text-slate-100 mb-4 italic leading-relaxed text-sm font-medium">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              <div className="border-t border-white/20 pt-4">
                <p className="font-semibold text-slate-50 text-sm">{testimonial.name}</p>
                {testimonial.location && (
                  <p className="text-xs text-slate-300 mt-1">{testimonial.location}</p>
                )}
                <p className="text-xs text-slate-400 capitalize mt-1">
                  {testimonial.category.replace('_', ' ')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
