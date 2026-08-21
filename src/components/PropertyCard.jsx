import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { PropertyStats } from './PropertyStats';

/**
 * Reusable Premium Property Listing Card.
 * 
 * @param {Object} props
 * @param {Object} props.property - Property object from JSON
 */
export const PropertyCard = ({ property }) => {
  if (!property) return null;

  const {
    id,
    name,
    type,
    priceDisplay,
    city,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
    featured,
  } = property;

  // Use the first image in array as card thumbnail
  const cardImage = images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg">
      
      {/* Upper Section: Image, Badges, Favorite Overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-100">
        <img
          src={cardImage}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Gradients Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

        {/* Featured Tag (Top Left) */}
        {featured && (
          <div className="absolute left-4 top-4 rounded-lg bg-accent-amber px-3 py-1 text-xs font-bold text-white shadow-sm border border-amber-400/20">
            Featured
          </div>
        )}

        {/* Favorite Button (Top Right) */}
        <div className="absolute right-4 top-4 z-10">
          <FavoriteButton id={id} />
        </div>

        {/* Type Badge (Bottom Left) */}
        <div className="absolute left-4 bottom-4 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm">
          {type}
        </div>
      </div>

      {/* Lower Section: Details */}
      <div className="flex flex-col p-5 flex-grow">
        
        {/* Pricing and City */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-extrabold text-primary-950 leading-none">
            {priceDisplay}
          </span>
        </div>

        {/* Property Name */}
        <h3 className="text-base font-bold text-primary-900 line-clamp-1 mb-1.5 group-hover:text-brand-600 transition-colors duration-200">
          {name}
        </h3>

        {/* Location & Address */}
        <div className="flex items-center gap-1.5 text-primary-500 text-xs mb-4">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
          <span className="line-clamp-1">{location}, {city}</span>
        </div>

        {/* Stats Row (Beds, Baths, Area) */}
        <div className="border-t border-primary-50 pt-4 pb-1 mt-auto">
          <PropertyStats bedrooms={bedrooms} bathrooms={bathrooms} area={area} />
        </div>
      </div>

      {/* Card Action Link Area */}
      <div className="px-5 pb-5 pt-1">
        <Link
          to={`/property/${id}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-600/10 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white py-2.5 text-xs font-bold transition-all duration-300"
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
};

export default PropertyCard;
