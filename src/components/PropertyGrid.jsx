import React from 'react';
import PropertyCard from './PropertyCard';

/**
 * Responsive Property Grid.
 * Displays 1 column on mobile, 2 on tablet, and 3-4 on desktop.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.properties - List of properties to display
 */
export const PropertyGrid = ({ properties = [] }) => {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
