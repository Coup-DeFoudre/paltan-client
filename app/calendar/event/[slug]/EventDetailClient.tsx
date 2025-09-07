'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Phone, 
  Mail,
  ExternalLink,
  Globe,
  Ticket,
  Tag,
  ArrowLeft,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  detailedDescription?: PortableTextBlock[];
  eventImage?: { asset: { url: string } };
  category: string;
  startDate: string;
  endDate: string;
  isAllDay?: boolean;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    coordinates?: { lat: number; lng: number };
  };
  organizer: {
    name: string;
    contact?: string;
    email?: string;
    website?: string;
  };
  ticketInfo?: {
    isFree: boolean;
    price?: number;
    bookingUrl?: string;
    availableSeats?: number;
  };
  tags?: string[];
  priority: string;
  publishedAt: string;
}

interface EventDetailClientProps {
  event: Event;
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('hi-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      religious: '🕉️',
      cultural: '🎭',
      educational: '📚',
      fair: '🎪',
      political: '🏛️',
      sports: '⚽',
      music: '🎵',
      community: '🤝',
      business: '💼',
      environment: '🌿',
    };
    return icons[category] || '📅';
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      religious: 'धार्मिक उत्सव',
      cultural: 'सांस्कृतिक कार्यक्रम',
      educational: 'शैक्षणिक सेमिनार',
      fair: 'मेला और रैली',
      political: 'राजनीतिक सभा',
      sports: 'खेल प्रतियोगिता',
      music: 'संगीत और कला',
      community: 'सामुदायिक कार्यक्रम',
      business: 'व्यापारिक सम्मेलन',
      environment: 'पर्यावरण जागरूकता',
    };
    return names[category] || category;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-amber-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link 
            href="/calendar"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Calendar</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden"
              >
                {/* Event Image */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <Image
                    src={event.eventImage?.asset?.url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop'}
                    alt={event.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-full">
                    <span className="text-2xl">{getCategoryIcon(event.category)}</span>
                    <span className="text-white font-medium">{getCategoryName(event.category)}</span>
                  </div>

                  {/* Priority Badge */}
                  {event.priority === 'high' && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      High Priority
                    </div>
                  )}

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm p-3 rounded-full text-white hover:bg-teal-500 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Event Details */}
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {event.title}
                  </h1>
                  
                  <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Detailed Description */}
                  {event.detailedDescription && (
                    <div className="prose prose-invert prose-slate max-w-none mb-8">
                      <PortableText
                        value={event.detailedDescription}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4">{children}</p>,
                            h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-2xl font-bold text-white mb-4">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xl font-bold text-white mb-3">{children}</h3>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-teal-500 pl-6 my-6 text-slate-300 italic">
                                {children}
                              </blockquote>
                            ),
                          },
                          list: {
                            bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 text-slate-300">{children}</ul>,
                            number: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-slate-300">{children}</ol>,
                          },
                          listItem: ({ children }) => <li className="mb-2">{children}</li>,
                          marks: {
                            strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            link: ({ value, children }) => (
                              <a 
                                href={value?.href} 
                                className="text-teal-400 hover:text-teal-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                              </a>
                            ),
                          },
                        }}
                      />
                    </div>
                  )}

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-400 font-medium">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Date and Time */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-teal-500" />
                  Date & Time
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Start Date</div>
                    <div className="text-white font-medium">{formatEventDate(event.startDate)}</div>
                    {!event.isAllDay && (
                      <div className="text-teal-400 text-sm">{formatEventTime(event.startDate)}</div>
                    )}
                  </div>
                  
                  {event.endDate && event.endDate !== event.startDate && (
                    <div>
                      <div className="text-slate-400 text-sm mb-1">End Date</div>
                      <div className="text-white font-medium">{formatEventDate(event.endDate)}</div>
                      {!event.isAllDay && (
                        <div className="text-teal-400 text-sm">{formatEventTime(event.endDate)}</div>
                      )}
                    </div>
                  )}

                  {event.isAllDay && (
                    <div className="text-amber-400 text-sm font-medium">
                      पूरे दिन का इवेंट
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  Location
                </h3>
                <div className="space-y-2">
                  <div className="text-white font-medium">{event.venue.name}</div>
                  <div className="text-slate-400">{event.venue.address}</div>
                  <div className="text-slate-400">{event.venue.city}, {event.venue.state}</div>
                  
                  {event.venue.coordinates && (
                    <a
                      href={`https://maps.google.com/?q=${event.venue.coordinates.lat},${event.venue.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm mt-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Organizer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-500" />
                  Organizer
                </h3>
                <div className="space-y-3">
                  <div className="text-white font-medium">{event.organizer.name}</div>
                  
                  {event.organizer.contact && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4" />
                      <span>{event.organizer.contact}</span>
                    </div>
                  )}
                  
                  {event.organizer.email && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${event.organizer.email}`} className="hover:text-teal-400 transition-colors">
                        {event.organizer.email}
                      </a>
                    </div>
                  )}
                  
                  {event.organizer.website && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Globe className="w-4 h-4" />
                      <a 
                        href={event.organizer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-teal-400 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Ticket Information */}
              {event.ticketInfo && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-teal-500" />
                    Tickets
                  </h3>
                  <div className="space-y-3">
                    {event.ticketInfo.isFree ? (
                      <div className="text-green-400 font-bold text-lg">
                        निःशुल्क प्रवेश
                      </div>
                    ) : (
                      <div className="text-white">
                        <div className="text-green-400 font-bold text-lg">
                          ₹{event.ticketInfo.price}
                        </div>
                        <div className="text-slate-400 text-sm">per person</div>
                      </div>
                    )}
                    
                    {event.ticketInfo.availableSeats && (
                      <div className="text-slate-300">
                        <span className="text-slate-400">Available Seats: </span>
                        <span className="font-medium">{event.ticketInfo.availableSeats}</span>
                      </div>
                    )}
                    
                    {event.ticketInfo.bookingUrl && (
                      <a
                        href={event.ticketInfo.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-teal-500 hover:bg-teal-600 text-slate-900 text-center py-3 px-4 rounded-lg font-bold transition-colors"
                      >
                        Book Tickets
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
