import { useApp } from '../context/AppContext';

/**
 * Custom hook for managing favorites.
 * Synchronized globally via AppContext.
 */
export const useFavorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useApp();
  
  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
