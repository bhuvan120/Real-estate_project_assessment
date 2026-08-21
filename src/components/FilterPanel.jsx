import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X, RotateCcw, Home, ChevronsUpDown } from 'lucide-react';

/**
 * Premium, Responsive Filter Panel.
 * Includes inline grid for desktop and an overlays drawer for mobile.
 */
export const FilterPanel = ({
  filters,
  onChange,
  cities = [],
  clearFilters,
  resultsCount = 0,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const handleFilterChange = (key, value) => {
    onChange(key, value);
  };

  const propertyTypes = ['All', 'Apartment', 'Villa', 'Independent House', 'Commercial'];
  const bedOptions = [
    { label: 'Any BHK', value: 'Any' },
    { label: '1 BHK', value: '1' },
    { label: '2 BHK', value: '2' },
    { label: '3 BHK', value: '3' },
    { label: '4+ BHK', value: '4+' },
  ];
  const priceOptions = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹50 Lakhs', value: 'under-50' },
    { label: '₹50 Lakhs – ₹1 Cr', value: '50-100' },
    { label: 'Above ₹1 Cr', value: 'above-100' },
  ];

  // Helper to count active filters (excluding default values)
  const activeFiltersCount = Object.entries(filters).reduce((acc, [key, val]) => {
    if (key === 'search') return acc; // search has its own Hero UI
    if (key === 'type' && val !== 'All') return acc + 1;
    if (key === 'priceRange' && val !== 'All') return acc + 1;
    if (key === 'bedrooms' && val !== 'Any') return acc + 1;
    if (key === 'city' && val !== 'All') return acc + 1;
    return acc;
  }, 0);

  const FilterForm = ({ isMobile = false }) => (
    <div className={`space-y-5 ${isMobile ? '' : 'lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:items-end'}`}>
      
      {/* City Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">
          City Location
        </label>
        <div className="relative">
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full rounded-xl border border-primary-200 bg-white py-2.5 px-3.5 text-sm font-medium text-primary-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 appearance-none cursor-pointer"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === 'All' ? 'All Cities' : city}
              </option>
            ))}
          </select>
          <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 text-primary-400 pointer-events-none" />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">
          Property Type
        </label>
        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full rounded-xl border border-primary-200 bg-white py-2.5 px-3.5 text-sm font-medium text-primary-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 appearance-none cursor-pointer"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'All' ? 'All Types' : type}
              </option>
            ))}
          </select>
          <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 text-primary-400 pointer-events-none" />
        </div>
      </div>

      {/* Bedrooms BHK */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">
          Rooms (Bedrooms)
        </label>
        <div className="relative">
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            className="w-full rounded-xl border border-primary-200 bg-white py-2.5 px-3.5 text-sm font-medium text-primary-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 appearance-none cursor-pointer"
          >
            {bedOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 text-primary-400 pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">
          Budget Range
        </label>
        <div className="relative">
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full rounded-xl border border-primary-200 bg-white py-2.5 px-3.5 text-sm font-medium text-primary-800 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-100 appearance-none cursor-pointer"
          >
            {priceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 text-primary-400 pointer-events-none" />
        </div>
      </div>

    </div>
  );

  return (
    <div className="w-full">
      {/* Desktop Filter Container (visible on md screens and up) */}
      <div className="hidden md:block rounded-2xl border border-primary-100 bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between border-b border-primary-50 pb-4 mb-4">
          <div className="flex items-center gap-2 text-primary-900">
            <SlidersHorizontal className="h-4 w-4 text-brand-600" />
            <span className="font-bold text-sm">Refine Listings</span>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 items-center justify-center rounded-full bg-brand-100 px-2 text-xs font-bold text-brand-700">
                {activeFiltersCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-primary-500 font-medium">
              Showing {resultsCount} matches
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-bold transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        <FilterForm />
      </div>

      {/* Mobile Filter Button and Trigger (visible on mobile only) */}
      <div className="flex md:hidden items-center justify-between gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary-200 bg-white py-3 px-4 font-bold text-primary-700 shadow-sm active:bg-primary-50"
        >
          <SlidersHorizontal className="h-4 w-4 text-brand-600" />
          Filter Properties
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white leading-none">
              {activeFiltersCount}
            </span>
          )}
        </button>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 active:bg-red-100"
            aria-label="Clear all filters"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-50 flex justify-end bg-primary-950/50 backdrop-blur-sm md:hidden animate-fadeIn"
        >
          {/* Drawer Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-[320px] flex-col bg-white shadow-soft-lg animate-slideInLeft"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-primary-100 px-5 py-4">
              <div className="flex items-center gap-2 text-primary-900">
                <SlidersHorizontal className="h-4 w-4 text-brand-600" />
                <span className="font-bold">Filters</span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full p-1.5 text-primary-400 hover:bg-primary-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterForm isMobile={true} />
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-primary-100 p-4 space-y-3 bg-primary-50">
              <div className="text-center text-xs text-primary-600 font-semibold">
                {resultsCount} properties match your filters
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    clearFilters();
                    setIsMobileOpen(false);
                  }}
                  className="flex-1 py-2.5 text-center text-sm font-bold text-red-600 hover:text-red-700 bg-white rounded-xl border border-red-200"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-bold text-white bg-brand-600 rounded-xl hover:bg-brand-700 shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default FilterPanel;
