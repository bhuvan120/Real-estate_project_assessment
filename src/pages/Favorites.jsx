import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { propertyService } from '../services/propertyService';
import PropertyGrid from '../components/PropertyGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

/**
 * Saved Favorites Listings Page.
 * Displays property list filtered by user-toggled favorite IDs.
 */
export const Favorites = () => {
  const { favorites } = useFavorites();
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchFavoriteProps = async () => {
      setLoading(true);
      setError(null);
      try {
        const allProps = await propertyService.getProperties(true);
        if (isMounted) {
          // Filter matching only favorited IDs
          const filtered = allProps.filter((p) => favorites.includes(p.id));
          setFavoriteProperties(filtered);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load your saved properties.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFavoriteProps();

    return () => {
      isMounted = false;
    };
  }, [favorites]);

  return (
    <div className="min-h-screen bg-primary-50/50 pb-16">
      
      {/* Header bar banner */}
      <div className="bg-white border-b border-primary-100 py-8 mb-8 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-accent-rose fill-accent-rose animate-pulse" />
                <h1 className="text-2xl font-black text-primary-950">Saved Properties</h1>
              </div>
              <p className="text-sm text-primary-500 font-medium">
                You have saved <strong className="text-accent-rose font-extrabold">{favorites.length}</strong> listings in your shortlist.
              </p>
            </div>
            
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-750 hover:bg-primary-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              Browse More
            </Link>
          </div>
        </div>
      </div>

      {/* Grid listing container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSkeleton count={4} />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : favoriteProperties.length === 0 ? (
          <EmptyState
            title="Your shortlist is empty"
            description="You haven't favorited any property listings yet. Tap the heart icon on any listing card or details page to add it here."
            onClear={() => window.location.assign('/')}
            clearLabel="Explore Listings"
          />
        ) : (
          <PropertyGrid properties={favoriteProperties} />
        )}
      </div>

    </div>
  );
};

export default Favorites;
