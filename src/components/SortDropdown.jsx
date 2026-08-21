import React from 'react';
import { ArrowUpDown } from 'lucide-react';

/**
 * Dropdown select for sorting options.
 * Works together with filters and search.
 * 
 * @param {Object} props
 * @param {string} props.value - Active sorting key
 * @param {Function} props.onChange - Sort option change callback
 */
export const SortDropdown = ({ value, onChange }) => {
  const options = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low → High', value: 'price-asc' },
    { label: 'Price: High → Low', value: 'price-desc' },
    { label: 'Newest Listings', value: 'newest' },
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-xs md:text-sm text-primary-500 font-semibold whitespace-nowrap">
        Sort By:
      </label>
      <div className="relative flex items-center">
        <ArrowUpDown className="absolute left-3 h-4 w-4 text-primary-400 pointer-events-none" />
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border border-primary-200 bg-white py-2 pl-9 pr-8 text-xs md:text-sm font-semibold text-primary-750 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
