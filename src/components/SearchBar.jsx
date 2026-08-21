import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable dynamic Search Bar with immediate input matching.
 * 
 * @param {Object} props
 * @param {string} props.value - Search string value
 * @param {Function} props.onChange - Input change callback
 * @param {string} [props.placeholder='Search by city, location or project name...'] - Custom placeholder
 * @param {string} [props.className] - Additional styling classes
 */
export const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search by property name, city, or location...',
  className = '',
}) => {
  const handleClear = () => {
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {/* Search Icon */}
      <Search className="absolute left-4 h-5 w-5 text-primary-400 pointer-events-none" />

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-primary-200 bg-white py-3.5 pl-12 pr-10 text-sm md:text-base outline-none transition-all duration-300 shadow-soft focus:border-brand-500 focus:ring-4 focus:ring-brand-100 placeholder:text-primary-400"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          type="button"
          className="absolute right-4 rounded-full p-1 text-primary-400 hover:bg-primary-100 hover:text-primary-600 transition-colors"
          aria-label="Clear search text"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
