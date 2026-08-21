import React from 'react';

/**
 * Shimmer Loading Skeleton for a single property card.
 */
export const CardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-soft animate-pulse">
      {/* Image Aspect ratio box */}
      <div className="relative aspect-[4/3] w-full bg-primary-200"></div>

      {/* Info details */}
      <div className="flex flex-col p-5 space-y-4">
        {/* Badges / Type */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-20 rounded bg-primary-200"></div>
          <div className="h-4 w-12 rounded bg-primary-200"></div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-primary-200"></div>
          <div className="h-4 w-1/2 rounded bg-primary-200"></div>
        </div>

        {/* Specs (Bed, Bath, Area) */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-5 w-12 rounded bg-primary-200"></div>
          <div className="h-5 w-12 rounded bg-primary-200"></div>
          <div className="h-5 w-16 rounded bg-primary-200"></div>
        </div>

        <hr className="border-primary-100" />

        {/* Footer info (Price & Button) */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 w-24 rounded bg-primary-200"></div>
          <div className="h-9 w-24 rounded-lg bg-primary-200"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Grid loading skeleton containing multiple CardSkeletons.
 * 
 * @param {Object} props
 * @param {number} [props.count=6] - Number of skeleton cards to render
 */
export const LoadingSkeleton = ({ count = 6 }) => {
  const cards = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
