import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Initialize favorites from localStorage
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('realestate_favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
    }
  }, []);

  // Initialize recently viewed from localStorage
  useEffect(() => {
    try {
      const storedRecent = localStorage.getItem('realestate_recently_viewed');
      if (storedRecent) {
        setRecentlyViewed(JSON.parse(storedRecent));
      }
    } catch (error) {
      console.error('Error reading recently viewed from localStorage:', error);
    }
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((id) => {
    const numericId = parseInt(id, 10);
    setFavorites((prev) => {
      let updated;
      if (prev.includes(numericId)) {
        updated = prev.filter((favId) => favId !== numericId);
      } else {
        updated = [...prev, numericId];
      }
      try {
        localStorage.setItem('realestate_favorites', JSON.stringify(updated));
      } catch (error) {
        console.error('Error writing favorites to localStorage:', error);
      }
      return updated;
    });
  }, []);

  // Check if a property is favorited
  const isFavorite = useCallback((id) => {
    return favorites.includes(parseInt(id, 10));
  }, [favorites]);

  // Add property to recently viewed
  const addToRecentlyViewed = useCallback((id) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return;

    setRecentlyViewed((prev) => {
      // Remove if already exists to push it to the top
      const filtered = prev.filter((vId) => vId !== numericId);
      // Keep only up to 7 items, then append new one to the front to make max 8
      const updated = [numericId, ...filtered].slice(0, 8);
      
      try {
        localStorage.setItem('realestate_recently_viewed', JSON.stringify(updated));
      } catch (error) {
        console.error('Error writing recently viewed to localStorage:', error);
      }
      return updated;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
