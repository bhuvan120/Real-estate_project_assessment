import { useApp } from '../context/AppContext';

/**
 * Custom hook for managing recently viewed properties.
 * Synchronized globally via AppContext.
 */
export const useRecentlyViewed = () => {
  const { recentlyViewed, addToRecentlyViewed } = useApp();

  return {
    recentlyViewed,
    addToRecentlyViewed,
  };
};
