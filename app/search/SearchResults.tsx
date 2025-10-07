'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, Calendar, User, Tag, Play, FileText, Calendar as EventIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResult {
  _type: 'article' | 'video' | 'event';
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  description?: string;
  category: string;
  author?: string;
  publishedAt: string;
  coverImage?: { asset: { url: string } };
  thumbnail?: { asset: { url: string } };
  thumbnailUrl?: string;
  embedUrl?: string;
  views?: number;
  tags?: string[];
  startDate?: string;
  endDate?: string;
  venue?: { name: string; city: string; state: string };
}

interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  suggestions: unknown[];
  page: number;
  totalPages: number;
  hasMore: boolean;
  searchTerm: string;
  type: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ title: string; _type: string; category: string }[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search function
  const performSearch = useCallback(async (term: string, page: number = 1, type: string = 'all') => {
    if (!term || term.trim().length < 2) {
      setSearchResults(null);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: term,
        page: page.toString(),
        limit: '10',
        type
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      
      if (page === 1) {
        setSearchResults(data);
      } else {
        setSearchResults(prev => prev ? {
          ...data,
          results: [...prev.results, ...data.results]
        } : data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced suggestions
  const fetchSuggestions = useCallback(async (term: string) => {
    if (!term || term.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const params = new URLSearchParams({
        q: term,
        suggestions: 'true'
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Suggestions error:', error);
    }
  }, []);

  // Handle search input
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value, 1, selectedType);
    }, 300);

    // Set timeout for suggestions
    setTimeout(() => {
      fetchSuggestions(value);
    }, 150);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm, 1, selectedType);
      setShowSuggestions(false);
      // Update URL
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Load more results
  const loadMore = () => {
    if (searchResults?.hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      performSearch(searchTerm, nextPage, selectedType);
    }
  };

  // Filter by content type
  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
    performSearch(searchTerm, 1, type);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get content type icon
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'event': return <EventIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Get content type label
  const getContentLabel = (type: string) => {
    switch (type) {
      case 'video': return 'वीडियो';
      case 'event': return 'इवेंट';
      default: return 'लेख';
    }
  };

  // Highlight search term in text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-amber-200 text-amber-900 px-1 rounded">$1</mark>');
  };

  // Initialize search on mount
  useEffect(() => {
    if (query) {
      performSearch(query, 1, selectedType);
    }
  }, [query, performSearch, selectedType]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
      
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Search Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                खोज
              </span>
            </h1>
            
            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="लेख, वीडियो, इवेंट खोजें..."
                  className="w-full px-6 py-4 pl-14 pr-24 text-lg bg-slate-800/60 border border-slate-700/50 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800/80 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30 transition-all duration-300"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                
                {/* Filter Button */}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 p-2 text-slate-500 hover:text-amber-400 transition-colors"
                >
                  <Filter size={18} />
                </button>
                
                {/* Search Button - Simple Icon */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(suggestion.title);
                          setShowSuggestions(false);
                          performSearch(suggestion.title, 1, selectedType);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors border-b border-slate-700/30 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          {getContentIcon(suggestion._type)}
                          <div>
                            <p className="text-slate-200 font-medium">{suggestion.title}</p>
                            <p className="text-slate-400 text-sm">{getContentLabel(suggestion._type)} • {suggestion.category}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-slate-800/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50"
                >
                  <div className="flex flex-wrap justify-center gap-2">
                    {['all', 'article', 'video', 'event'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleTypeFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedType === type
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                        }`}
                      >
                        {type === 'all' ? 'सभी' : getContentLabel(type)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Search Results */}
          <div className="space-y-6">
            {searchResults ? (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-slate-300">
                    <span className="text-amber-400">&ldquo;{searchResults.searchTerm}&rdquo;</span> के लिए {searchResults.totalCount} परिणाम मिले
                  </h2>
                  {searchResults.totalPages > 1 && (
                    <p className="text-slate-400 text-sm">
                      पेज {searchResults.page} / {searchResults.totalPages}
                    </p>
                  )}
                </div>

                {/* Results List */}
                <div className="space-y-4">
                  {searchResults.results.map((result, index) => (
                    <motion.div
                      key={result._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 group"
                    >
                      <Link 
                        href={
                          result._type === 'article' ? `/articles/${result.slug.current}` :
                          result._type === 'video' ? `/videos?focus=${result._id}` :
                          `/calendar/event/${result.slug.current}`
                        }
                        className="block"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Content Type Icon */}
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center text-amber-400">
                              {getContentIcon(result._type)}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 
                                className="text-lg font-semibold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightText(result.title, searchResults.searchTerm) 
                                }}
                              />
                              <span className="ml-2 px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                                {getContentLabel(result._type)}
                              </span>
                            </div>

                            {/* Description */}
                            {(result.excerpt || result.description) && (
                              <p 
                                className="text-slate-400 mb-3 line-clamp-2"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightText(result.excerpt || result.description || '', searchResults.searchTerm) 
                                }}
                              />
                            )}

                            {/* Metadata */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(result.publishedAt)}</span>
                              </div>
                              
                              {result.author && (
                                <div className="flex items-center space-x-1">
                                  <User className="w-4 h-4" />
                                  <span>{result.author}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-1">
                                <Tag className="w-4 h-4" />
                                <span>{result.category}</span>
                              </div>

                              {result.venue && (
                                <span>{result.venue.city}, {result.venue.state}</span>
                              )}
                            </div>
                          </div>

                          {/* Thumbnail */}
                          {(result.coverImage || result.thumbnail || result.thumbnailUrl) && (
                            <div className="flex-shrink-0">
                              <Image
                                src={
                                  result.coverImage?.asset?.url || 
                                  result.thumbnail?.asset?.url || 
                                  result.thumbnailUrl || 
                                  '/placeholder-video.svg'
                                }
                                alt={result.title}
                                width={120}
                                height={80}
                                className="w-30 h-20 object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Load More Button */}
                {searchResults.hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>लोड हो रहा है...</span>
                        </div>
                      ) : (
                        'और परिणाम देखें'
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : query ? (
              <div className="text-center py-12">
                <h2 className="text-xl text-slate-300 mb-4">
                  <span className="text-amber-400">&ldquo;{query}&rdquo;</span> के लिए कोई परिणाम नहीं मिला
                </h2>
                <p className="text-slate-500">
                  कृपया अलग शब्दों से खोज करने का प्रयास करें
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl text-slate-300 mb-4">
                  खोज शुरू करें
                </h2>
                <p className="text-slate-500">
                  हमारे लेख, वीडियो और इवेंट्स में से खोजें
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
