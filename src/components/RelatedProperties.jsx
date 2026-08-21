import React from 'react';
import PropertyCard from './PropertyCard';

/**
 * Related Properties Section.
 * Shows matching properties (by type/city) in a card grid.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.properties - List of related property objects
 */
export const RelatedProperties = ({ properties = [] }) => {
  if (!properties || properties.length === 0) return null;

  return (
    <section className="border-t border-primary-100 pt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-950">
            Similar Properties You May Like
          </h2>
          <p className="text-sm text-primary-500">
            Based on this property's city location and architectural type
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((item) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProperties;
