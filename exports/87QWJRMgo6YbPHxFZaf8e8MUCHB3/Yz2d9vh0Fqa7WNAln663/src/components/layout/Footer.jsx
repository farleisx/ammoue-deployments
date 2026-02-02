import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 py-12 px-4 sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="text-white text-2xl font-bold">
            NEXORA
          </Link>
          <p className="text-neutral-400 text-sm">Smart Gear for the Next Generation</p>
          <p className="text-neutral-400 text-sm">© {new Date().getFullYear()} NEXORA. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/shop" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">Shop</Link></li>
            <li><Link to="/dashboard" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">Dashboard</Link></li>
            <li><Link to="/support" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">Support</Link></li>
            <li><Link to="/privacy" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><Link to="/contact" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">Contact Us</Link></li>
            <li><Link to="/about" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">About Us</Link></li>
            <li><Link to="/careers" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">Careers</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com/nexora" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com/nexora" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">
              <Instagram size={24} />
            </a>
            <a href="https://twitter.com/nexora" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">
              <Twitter size={24} />
            </a>
            <a href="https://linkedin.com/company/nexora" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary-light transition-colors duration-200">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;