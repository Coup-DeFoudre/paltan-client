'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Grid,
  List,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  eventImage?: { asset: { url: string } };
  category: string;
  startDate: string;
  endDate: string;
  isAllDay?: boolean;
  venue: {
    name: string;
    city: string;
    state: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  organizer?: {
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
  isFeatured?: boolean;
}

interface CalendarPageClientProps {
  allEvents: Event[];
  upcomingEvents: Event[];
  featuredEvents: Event[];
}

export default function CalendarPageClient({ 
  allEvents, 
  featuredEvents 
}: CalendarPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // const [currentMonth, setCurrentMonth] = useState(new Date());

  const categories = [
    { key: 'all', label: 'सभी', icon: '📅' },
    { key: 'religious', label: 'धार्मिक उत्सव', icon: '🕉️' },
    { key: 'cultural', label: 'सांस्कृतिक', icon: '🎭' },
    { key: 'educational', label: 'शैक्षणिक', icon: '📚' },
    { key: 'fair', label: 'मेला और रैली', icon: '🎪' },
    { key: 'political', label: 'राजनीतिक', icon: '🏛️' },
    { key: 'sports', label: 'खेल', icon: '⚽' },
    { key: 'music', label: 'संगीत और कला', icon: '🎵' },
    { key: 'community', label: 'सामुदायिक', icon: '🤝' },
    { key: 'business', label: 'व्यापारिक', icon: '💼' },
    { key: 'environment', label: 'पर्यावरण', icon: '🌿' },
  ];

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return allEvents;
    return allEvents.filter(event => event.category === selectedCategory);
  }, [allEvents, selectedCategory]);

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
    const cat = categories.find(c => c.key === category);
    return cat?.icon || '📅';
  };

  // const getPriorityColor = (priority: string) => {
  //   switch (priority) {
  //     case 'high': return 'text-red-500 bg-red-500/10';
  //     case 'medium': return 'text-amber-500 bg-amber-500/10';
  //     default: return 'text-blue-500 bg-blue-500/10';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-amber-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <CalendarIcon className="w-10 h-10 text-teal-500" />
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Event Calendar
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-teal-400 mb-4">
                इवेंट कैलेंडर
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                अपने क्षेत्र के त्योहार, रैलियाँ, सांस्कृतिक कार्यक्रम और अन्य महत्वपूर्ण इवेंट्स की जानकारी पाएं
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Featured Events Section */}
          {featuredEvents.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-amber-500" />
                <h2 className="text-3xl font-bold text-white">Featured Events</h2>
                <h3 className="text-xl text-amber-400">फीचर्ड इवेंट्स</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.slice(0, 3).map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-teal-500/50 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.eventImage?.asset?.url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-amber-500 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                      <div className="absolute top-3 right-3 text-2xl">
                        {getCategoryIcon(event.category)}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{formatEventDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue.name}, {event.venue.city}</span>
                        </div>
                        {!event.ticketInfo?.isFree && event.ticketInfo?.price && (
                          <div className="flex items-center gap-2 text-green-400">
                            <span className="font-semibold">₹{event.ticketInfo.price}</span>
                          </div>
                        )}
                        {event.ticketInfo?.isFree && (
                          <div className="text-green-400 font-semibold">
                            निःशुल्क
                          </div>
                        )}
                      </div>
                      
                      <Link 
                        href={`/calendar/event/${event.slug.current}`}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-900 rounded-lg font-medium transition-colors"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Filter and View Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Category Filter */}
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-white">Filter by Category</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-teal-500 text-slate-900'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">View:</span>
              <div className="flex bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-teal-500 text-slate-900' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-teal-500 text-slate-900' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === 'all' ? 'All Events' : categories.find(c => c.key === selectedCategory)?.label}
                <span className="text-slate-400 text-base ml-3">
                  ({filteredEvents.length} events)
                </span>
              </h2>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <CalendarIcon className="w-24 h-24 text-slate-600 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  No Events Found
                </h3>
                <p className="text-slate-500">
                  इस श्रेणी में कोई इवेंट उपलब्ध नहीं है
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-teal-500/50 transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-64 h-40 flex-shrink-0' : 'h-48'
                    }`}>
                      <Image
                        src={event.eventImage?.asset?.url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop'}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {event.priority === 'high' && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          High Priority
                        </div>
                      )}
                      
                      <div className="absolute top-3 right-3 text-2xl">
                        {getCategoryIcon(event.category)}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <h4 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{formatEventDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4" />
                          <span>
                            {event.isAllDay ? 'पूरे दिन' : formatEventTime(event.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue.name}, {event.venue.city}</span>
                        </div>
                        {event.organizer && (
                          <div className="flex items-center gap-2 text-slate-300">
                            <Users className="w-4 h-4" />
                            <span>{event.organizer.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {event.ticketInfo?.isFree ? (
                          <div className="text-green-400 font-semibold">
                            निःशुल्क
                          </div>
                        ) : event.ticketInfo?.price ? (
                          <div className="text-green-400 font-semibold">
                            ₹{event.ticketInfo.price}
                          </div>
                        ) : (
                          <div className="text-slate-400 text-sm">
                            Price TBA
                          </div>
                        )}
                        
                        <Link 
                          href={`/calendar/event/${event.slug.current}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-900 rounded-lg font-medium transition-colors"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Load More Events */}
          {filteredEvents.length > 12 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-teal-400 rounded-lg font-medium transition-all duration-300 border border-slate-600">
                Load More Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
