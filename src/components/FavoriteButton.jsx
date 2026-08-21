import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

/**
 * Premium Favorite (Heart) Button that syncs state with localStorage.
 * Stops click propagation to prevent navigating when placed inside a card link.
 * 
 * @param {Object} props
 * @param {number|string} props.id - Property ID
 * @param {string} [props.className] - Additional styling classes
 * @param {boolean} [props.showLabel=false] - Whether to show a text label next to the heart
 */
export const FavoriteButton = ({ id, className = '', showLabel = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`group relative flex items-center justify-center gap-2 rounded-full p-2.5 transition-all duration-300 active:scale-95 ${
        active
          ? 'bg-red-50 text-accent-rose shadow-red-100/50'
          : 'bg-white/90 text-primary-600 hover:bg-white hover:text-accent-rose hover:shadow-soft'
      } border border-primary-100 shadow-sm hover:scale-105 ${className}`}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${
          active
            ? 'fill-accent-rose stroke-accent-rose'
            : 'stroke-[2px] group-hover:scale-110'
        }`}
      />
      {showLabel && (
        <span className={`text-sm font-medium ${active ? 'text-accent-rose' : 'text-primary-700'}`}>
          {active ? 'Favorited' : 'Save Property'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
