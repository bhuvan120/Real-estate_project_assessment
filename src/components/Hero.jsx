import React from 'react';
import SearchBar from './SearchBar';

/**
 * Premium Hero Section with high-contrast text and integrated SearchBar.
 * 
 * @param {Object} props
 * @param {string} props.searchValue - Current search string
 * @param {Function} props.onSearchChange - Callback for search input updates
 */
export const Hero = ({ searchValue, onSearchChange }) => {
  return (
    <div className="relative flex min-h-[440px] md:min-h-[500px] items-center justify-center overflow-hidden bg-primary-950 px-4 py-16 md:py-24 text-center">
      {/* Background Image with Dark Glassmorphism Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Real Estate Background"
          className="h-full w-full object-cover object-center opacity-40 scale-105 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/60 to-primary-950/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-3xl space-y-6 md:space-y-8">
        
        {/* Callout Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-4 py-1.5 border border-brand-500/25 text-xs font-semibold text-brand-300 tracking-wider uppercase animate-fadeIn">
          🏠 Discover Your Next Chapter
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Find a place you'll <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-300">
              love to call home
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-200 max-w-xl mx-auto font-normal leading-relaxed">
            Explore verified luxury apartments, gated villas, independent houses, and premium commercial workspaces in India's leading metro cities.
          </p>
        </div>

        {/* Hero Search Box */}
        <div className="mx-auto w-full max-w-2xl pt-2">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search by city (e.g. Pune), location (e.g. Gachibowli), or name..."
          />
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-primary-300">
          <div className="flex items-center gap-1.5">
            <span>✨ Verified Listings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🛡️ 100% Gated Communities</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📞 Direct Agent Contact</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
