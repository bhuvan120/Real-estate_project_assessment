import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import PropertyGrid from '../components/PropertyGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { useProperties } from '../hooks/useProperties';
import { RefreshCw, AlertTriangle } from 'lucide-react';

/**
 * Real Estate Home Directory Page.
 * Orchestrates Search, Filtering, Sorting and grid listing views.
 */
export const Home = () => {
  const location = useLocation();
  const {
    filteredProperties,
    loading,
    error,
    filters,
    sortBy,
    cities,
    setFilter,
    setSortBy,
    clearFilters,
    refetch,
  } = useProperties();

  useEffect(() => {
    const type = new URLSearchParams(location.search).get('type');

    if (!type) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById('available-properties')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.search]);

  const handleSearchChange = (value) => {
    setFilter('search', value);
  };

  const handleFilterChange = (key, value) => {
    setFilter(key, value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-50/50">
      {/* Premium Hero with Integrated Search */}
      <Hero searchValue={filters.search} onSearchChange={handleSearchChange} />

      {/* Directory Content Area */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        
        {/* Responsive Grid Layout: Left filter row, Right sorting + listings */}
        <div className="flex flex-col gap-6">
          
          {/* Filters Bar (Responsive: row for desktop, drawer trigger on mobile) */}
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            cities={cities}
            clearFilters={clearFilters}
            resultsCount={filteredProperties.length}
          />

          {/* Results Summary and Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary-100 pb-4">
            <div>
              <h2 id="available-properties" className="scroll-mt-24 text-lg md:text-xl font-extrabold text-primary-950">
                {loading ? 'Finding properties...' : 'Available Properties'}
              </h2>
              {!loading && !error && (
                <p className="text-xs md:text-sm text-primary-500 font-medium">
                  We found <strong className="text-brand-600 font-bold">{filteredProperties.length}</strong> matching premium listings.
                </p>
              )}
            </div>
            
            {!loading && !error && (
              <SortDropdown value={sortBy} onChange={setSortBy} />
            )}
          </div>

          {/* Main Listings State Switcher */}
          <div className="pt-2">
            {loading ? (
              <LoadingSkeleton count={8} />
            ) : error ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-red-100 bg-red-50/20 max-w-lg mx-auto">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-primary-900 mb-1">Unable to Load Listings</h3>
                <p className="text-sm text-primary-600 mb-6">{error}</p>
                <button
                  onClick={refetch}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry Connection
                </button>
              </div>
            ) : filteredProperties.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <PropertyGrid properties={filteredProperties} />
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
