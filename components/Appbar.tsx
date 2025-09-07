"use client"
import React, { useState } from 'react';
import { Home, Play, Info, Phone, Menu, X, Rss, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';


interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const AppBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'videos', label: 'Videos', icon: Play, href: '/videos' },
    { id: 'rss', label: 'RSS Feed', icon: Rss, href: '/rss-feed' },
    { id: 'about', label: 'About Us', icon: Info, href: '/about' },
    { id: 'contact', label: 'Contact Us', icon: Phone, href: '/contact' }
  ];
  
  // All navigation items for both desktop and mobile (weekly PDF removed)
  const bottomNavItems = navItems;

  // Handle mobile search
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsMobileSearchOpen(false);
      setSearchTerm('');
    }
  };
  

 

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <Image 
                  src="/logo.png" 
                  alt="दी पल्टन Logo" 
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <h1 className="text-2xl font-bold text-white hover:text-amber-400 transition-colors duration-300">द पल्टन</h1>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="flex items-center space-x-6">
              {/* Clean Navigation Links */}
              <div className="flex items-center space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-amber-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="लेख, वीडियो, इवेंट खोजें..."
                  className="w-80 px-4 py-2 pl-10 pr-4 text-sm bg-slate-800/30 border border-slate-700/30 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800/50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all duration-300"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const searchTerm = (e.target as HTMLInputElement).value;
                      if (searchTerm.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                      }
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
              </div>


            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - App-like Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 shadow-2xl">
        <div className="flex items-center justify-around px-1 py-2 safe-area-inset-bottom">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 min-w-0 touch-manipulation ${
                  isActive
                    ? 'text-amber-400 bg-slate-800/80 scale-105 shadow-lg'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 active:scale-95'
                }`}
                style={{ minHeight: '60px', minWidth: '60px' }}
              >
                <Icon size={22} className="mb-1" />
                <span className="text-xs font-medium truncate">{item.label}</span>
                {isActive && <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full shadow-lg"></div>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Top Bar - Clean Design */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="दी पल्टन Logo" 
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-xl font-bold text-white">द पल्टन</h1>
          </Link>
          <div className="flex items-center space-x-3">
            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsMobileSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-800/40 transition-all duration-300"
            >
              <Search size={18} className="text-slate-400" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-800/40 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={18} className="text-slate-300" /> : <Menu size={18} className="text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-md border-b border-slate-700 shadow-2xl">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-amber-400 bg-slate-700/80'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700/60'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Search Modal */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-2xl">
              <div className="px-4 py-4">
                <form onSubmit={handleMobileSearch} className="relative">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsMobileSearchOpen(false)}
                      className="p-2 rounded-lg hover:bg-slate-800/40 transition-all duration-300"
                    >
                      <X size={20} className="text-slate-400" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="लेख, वीडियो, इवेंट खोजें..."
                        className="w-full px-4 py-3 pl-12 pr-4 text-lg bg-slate-800/60 border border-slate-700/50 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800/80 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30 transition-all duration-300"
                        autoFocus
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                    </div>
                    <button
                      type="submit"
                      disabled={!searchTerm.trim()}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      खोजें
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
     
    </>
  );
};

export default AppBar;