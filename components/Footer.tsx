import Link from 'next/link';
import { Instagram, Youtube, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">द पल्टन</h3>
            <p className="text-slate-200 mb-4 leading-relaxed">
              Jahan Khabar sirf headlines nahi hoti, ek samajh bhi hoti hai.
            </p>
            <p className="text-slate-400 text-sm mb-6">
              एक स्वतंत्र मीडिया प्लेटफॉर्म जो सच्ची, संतुलित और संवेदनशील पत्रकारिता करता है।
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/60 rounded-lg hover:bg-pink-600/20 hover:text-pink-400 transition-all duration-300 border border-slate-700/50"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/60 rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-all duration-300 border border-slate-700/50"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/60 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300 border border-slate-700/50"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:thepaltann@gmail.com"
                className="p-3 bg-slate-800/60 rounded-lg hover:bg-green-600/20 hover:text-green-400 transition-all duration-300 border border-slate-700/50"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/rss-feed" className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                  Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-teal-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors"></span>
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-teal-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-300 hover:text-teal-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-teal-400 transition-colors"></span>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © The Paltan, 2025-2026. All rights reserved.
            </div>
            <div className="text-slate-400 text-sm">
              Email: <a href="mailto:thepaltann@gmail.com" className="text-amber-400 hover:text-amber-300 transition-colors">thepaltann@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
