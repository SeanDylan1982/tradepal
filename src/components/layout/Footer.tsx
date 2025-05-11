import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-xl font-bold text-teal-400">TradePal</h2>
            <p className="mb-4 text-gray-300">
              Buy and sell everything from second-hand cars to mobile phones, or find a new home. 
              Find a great deal close to you, or search all of Australia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-teal-400">Vehicles</a></li>
              <li><a href="#" className="hover:text-teal-400">Electronics</a></li>
              <li><a href="#" className="hover:text-teal-400">Furniture</a></li>
              <li><a href="#" className="hover:text-teal-400">Jobs</a></li>
              <li><a href="#" className="hover:text-teal-400">Services</a></li>
              <li><a href="#" className="hover:text-teal-400">Property</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Help & Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-teal-400">FAQs</a></li>
              <li><a href="#" className="hover:text-teal-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-teal-400">Safety Tips</a></li>
              <li><a href="#" className="hover:text-teal-400">Terms of Use</a></li>
              <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400">Posting Rules</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>support@tradepal.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>1800 123 456</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="mb-2 font-medium">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full rounded-l-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-teal-500 focus:outline-none"
                />
                <button className="rounded-r-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TradePal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;