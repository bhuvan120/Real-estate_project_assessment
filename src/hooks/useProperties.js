import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { propertyService } from '../services/propertyService';

const DEFAULT_FILTERS = {
  search: '',
  type: 'All',
  priceRange: 'All',
  bedrooms: 'Any',
  city: 'All',
};

const DEFAULT_SORT = 'recommended';

/**
 * Custom hook to load, search, filter, and sort properties.
 */
export const useProperties = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    return type
      ? { ...DEFAULT_FILTERS, type }
      : DEFAULT_FILTERS;
  });
  const [sortBy, setSortBy] = useState(DEFAULT_SORT);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch properties on mount or retry
  useEffect(() => {
    let isMounted = true;
    const fetchProps = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await propertyService.getProperties(true);
        if (isMounted) {
          setProperties(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load properties. Please check your connection and try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProps();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  // Trigger retry
  const refetch = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  // Update a single filter
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortBy(DEFAULT_SORT);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');

    setFilters({
      ...DEFAULT_FILTERS,
      type: type || 'All',
    });
  }, [location.search]);

  // Dynamically extract unique cities from data
  const cities = useMemo(() => {
    const list = properties.map((p) => p.city);
    return ['All', ...new Set(list)].sort();
  }, [properties]);

  // Perform search, filtering, and sorting using useMemo
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // 1. Filter by Search Query (Name, City, Location, Address, Description)
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query)
      );
    }

    // 2. Filter by Property Type
    if (filters.type !== 'All') {
      result = result.filter((p) => p.type.toLowerCase() === filters.type.toLowerCase());
    }

    // 3. Filter by City
    if (filters.city !== 'All') {
      result = result.filter((p) => p.city.toLowerCase() === filters.city.toLowerCase());
    }

    // 4. Filter by Price Range
    if (filters.priceRange !== 'All') {
      switch (filters.priceRange) {
        case 'under-50':
          result = result.filter((p) => p.price < 5000000); // Under 50 Lakhs
          break;
        case '50-100':
          result = result.filter((p) => p.price >= 5000000 && p.price <= 10000000); // 50 Lakhs - 1 Crore
          break;
        case 'above-100':
          result = result.filter((p) => p.price > 10000000); // Above 1 Crore
          break;
        default:
          break;
      }
    }

    // 5. Filter by Bedrooms (BHK)
    if (filters.bedrooms !== 'Any') {
      if (filters.bedrooms === '4+') {
        result = result.filter((p) => p.bedrooms >= 4);
      } else {
        const bedCount = parseInt(filters.bedrooms, 10);
        result = result.filter((p) => p.bedrooms === bedCount);
      }
    }

    // 6. Sort results
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
        break;
      case 'recommended':
      default:
        // Featured first, then newest
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.listedDate) - new Date(a.listedDate);
        });
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  return {
    properties,
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
  };
};
