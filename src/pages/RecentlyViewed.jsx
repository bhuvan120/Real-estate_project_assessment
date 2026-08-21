import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowLeft, Trash2 } from 'lucide-react';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { propertyService } from '../services/propertyService';
import PropertyGrid from '../components/PropertyGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

/**
 * History Page for Recently Viewed Listings.
 * Loads listings from visiting history IDs, maintaining chronological order.
 */
export const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchRecentProps = async () => {
      setLoading(true);
      setError(null);
      try {
        const allProps = await propertyService.getProperties(true);
        if (isMounted) {
          // Map stored IDs back to listing objects in the EXACT order they appear in history
          const mapped = recentlyViewed
            .map((vId) => allProps.find((p) => p.id === vId))
            .filter(Boolean);
          setRecentProperties(mapped);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load recently viewed history.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecentProps();

    return () => {
      isMounted = false;
    };
  }, [recentlyViewed]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('realestate_recently_viewed');
      // Force page reload or state sync. Refresh is reliable and clears active hook states.
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50/50 pb-16">
      
      {/* Header bar banner */}
      <div className="bg-white border-b border-primary-100 py-8 mb-8 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <History className="h-6 w-6 text-brand-600" />
                <h1 className="text-2xl font-black text-primary-950">Recently Viewed</h1>
              </div>
              <p className="text-sm text-primary-500 font-medium">
                Showing the last <strong className="text-brand-600 font-bold">{recentlyViewed.length}</strong> listings you explored.
              </p>
            </div>
            
            <div className="flex gap-3">
              {recentProperties.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors shadow-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear History
                </button>
              )}
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-750 hover:bg-primary-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
                Browse Properties
              </Link>
            </div>
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
        ) : recentProperties.length === 0 ? (
          <EmptyState
            title="No visitation history"
            description="You haven't viewed any property listings yet. Visit the details page of any property to track your navigation history."
            onClear={() => window.location.assign('/')}
            clearLabel="Explore Listings"
          />
        ) : (
          <PropertyGrid properties={recentProperties} />
        )}
      </div>

    </div>
  );
};

export default RecentlyViewed;
