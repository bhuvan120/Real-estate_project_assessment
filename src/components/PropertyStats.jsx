import React from 'react';
import { BedDouble, Bath, Square } from 'lucide-react';

/**
 * Renders key property stats (Bedrooms, Bathrooms, Sqft Area) with icons.
 * 
 * @param {Object} props
 * @param {number} props.bedrooms - Bedroom count
 * @param {number} props.bathrooms - Bathroom count
 * @param {number} props.area - Square feet area
 * @param {string} [props.className] - Additional styling classes
 * @param {boolean} [props.bordered=false] - Whether to put borders between items
 */
export const PropertyStats = ({ bedrooms, bathrooms, area, className = '', bordered = false }) => {
  return (
    <div className={`flex items-center gap-4 text-primary-600 ${className}`}>
      {bedrooms > 0 && (
        <div className={`flex items-center gap-1.5 ${bordered ? 'pr-4 border-r border-primary-200' : ''}`}>
          <BedDouble className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-medium text-primary-700">
            {bedrooms} <span className="text-primary-500 font-normal">BHK</span>
          </span>
        </div>
      )}
      
      {bathrooms > 0 && (
        <div className={`flex items-center gap-1.5 ${bordered ? 'pr-4 border-r border-primary-200' : ''}`}>
          <Bath className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-medium text-primary-700">
            {bathrooms} <span className="text-primary-500 font-normal">Baths</span>
          </span>
        </div>
      )}
      
      {area > 0 && (
        <div className="flex items-center gap-1.5">
          <Square className="h-3.5 w-3.5 text-brand-500" />
          <span className="text-sm font-medium text-primary-700">
            {area.toLocaleString()} <span className="text-primary-500 font-normal">sqft</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default PropertyStats;
