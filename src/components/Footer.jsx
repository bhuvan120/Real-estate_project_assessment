import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Globe
} from "lucide-react";

/**
 * Reusable Premium Footer component.
 */
export const Footer = () => {
  return (
    <footer className="bg-primary-950 text-primary-350 border-t border-primary-900">
      
      {/* Top Footer Sections */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Profile */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white font-black text-base shadow-sm">R</span>
                Realistae<span className="text-brand-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-primary-400 leading-relaxed">
              India's premier marketplace for luxury apartments, gated villas, independent bungalows, and high-yield commercial spaces. Discover a place you'll love to call home.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="rounded-full p-2 bg-primary-900 text-primary-400 hover:bg-brand-600 hover:text-white transition-all duration-200" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="rounded-full p-2 bg-primary-900 text-primary-400 hover:bg-brand-600 hover:text-white transition-all duration-200" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="rounded-full p-2 bg-primary-900 text-primary-400 hover:bg-brand-600 hover:text-white transition-all duration-200" aria-label="Instagram">
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="rounded-full p-2 bg-primary-900 text-primary-400 hover:bg-brand-600 hover:text-white transition-all duration-200" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-primary-400 hover:text-white transition-colors">Browse Properties</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-primary-400 hover:text-white transition-colors">Your Favorites</Link>
              </li>
              <li>
                <Link to="/recently-viewed" className="text-primary-400 hover:text-white transition-colors">Recently Viewed</Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-400 hover:text-white transition-colors">About Company</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-400 hover:text-white transition-colors">Privacy Policy & Terms</Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Real Estate Options
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/?type=Apartment" className="text-primary-400 hover:text-white transition-colors">Luxury Apartments</Link>
              </li>
              <li>
                <Link to="/?type=Villa" className="text-primary-400 hover:text-white transition-colors">Premium Villas</Link>
              </li>
              <li>
                <Link to="/?type=Independent%20House" className="text-primary-400 hover:text-white transition-colors">Independent Houses</Link>
              </li>
              <li>
                <Link to="/?type=Commercial" className="text-primary-400 hover:text-white transition-colors">Commercial Offices</Link>
              </li>
              <li>
                <Link to="/signup" className="text-primary-400 hover:text-white transition-colors">List Your Property</Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-2.5 items-start">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-brand-500 mt-0.5" />
                <span className="text-primary-400">
                  Level 8, DLF Cyber City, Phase III, Sector 24, Gurgaon, Haryana 122002
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" />
                <span className="text-primary-400">+91 98765 43210</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="h-4 w-4 shrink-0 text-brand-500" />
                <span className="text-primary-400">contact@realistae.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-primary-900 bg-primary-950/50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-primary-500">
            &copy; {new Date().getFullYear()} Realistae Solutions Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-primary-500">
            <Link to="/disclaimer" className="hover:text-primary-400">Disclaimer</Link>
            <a href="#" className="hover:text-primary-400">Site Map</a>
            <a href="#" className="hover:text-primary-400">India Properties</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
