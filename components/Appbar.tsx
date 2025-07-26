"use client"
import React, { useState } from 'react';
import { Home, Play, FileText, Info, Phone, Menu, X, Rss } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const AppBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'videos', label: 'Videos', icon: Play, href: '/videos' },
    { id: 'pdfs', label: 'Weekly PDFs', icon: FileText, href: '/weekly-pdf' },
    { id: 'about', label: 'About Us', icon: Info, href: '/about' },
    { id: 'contact', label: 'Contact Us', icon: Phone, href: '/contact' },
    { id: 'rss', label: 'RSS Feed', icon: Rss, href: '/rss-feed' }
  ];
  
  // Bottom navigation items exclude the RSS Feed option
  const bottomNavItems = navItems.filter(item => item.id !== 'rss');
  

 

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">The Paltan</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors duration-200 min-w-0 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Top Bar with Menu Toggle (for small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-xl font-bold text-gray-900">The Paltan</h1>
          <div className="flex items-center space-x-2">
            <Link 
              href="/rss-feed"
              className="p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
            >
              <Rss size={20} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
      </div>
     
    </>
  );
};

export default AppBar;