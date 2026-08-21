import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Share2, Phone, Calendar, ShieldCheck, Ruler, ClipboardList } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import ImageGallery from '../components/ImageGallery';
import Amenities from '../components/Amenities';
import FavoriteButton from '../components/FavoriteButton';
import ContactAgentModal from '../components/ContactAgentModal';
import RelatedProperties from '../components/RelatedProperties';

/**
 * Premium Property Details Page.
 * Loads property metadata, records visit to recently viewed list, and displays related recommendations.
 */
export const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch active property and its matching recommendations
  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await propertyService.getPropertyById(id);
        if (!data) {
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setProperty(data);
          // Sync with recently viewed logs
          addToRecentlyViewed(data.id);
        }

        // Load similar listings
        const similar = await propertyService.getRelatedProperties(data, 3);
        if (isMounted) {
          setRelated(similar);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [id, addToRecentlyViewed]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-pulse bg-white">
        <div className="h-6 w-24 bg-primary-200 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 aspect-[16/10] bg-primary-200 rounded-2xl"></div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-10 w-3/4 bg-primary-200 rounded"></div>
            <div className="h-6 w-1/3 bg-primary-200 rounded"></div>
            <div className="h-20 bg-primary-200 rounded"></div>
            <div className="h-12 bg-primary-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mb-4 mx-auto border border-red-100 shadow-sm">
          <ClipboardList className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-black text-primary-900 mb-2">Listing Not Found</h2>
        <p className="text-sm text-primary-600 mb-8 leading-relaxed">
          The property listing you are trying to view does not exist or has been removed from our directory database.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 font-bold transition-colors shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>
      </div>
    );
  }

  const {
    name,
    type,
    priceDisplay,
    city,
    location,
    address,
    bedrooms,
    bathrooms,
    area,
    description,
    images,
    amenities,
    listedDate,
    featured,
  } = property;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out ${name} in ${location}, ${city} on Realistae!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-primary-50/30 pb-16">
      
      {/* Detail Container */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 rounded-xl border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-750 hover:bg-primary-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
            Back
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="rounded-xl border border-primary-200 bg-white p-2.5 text-primary-600 hover:bg-primary-50 transition-colors shadow-sm"
              aria-label="Share property link"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <div className="shadow-sm rounded-xl">
              <FavoriteButton id={property.id} showLabel={false} />
            </div>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          
          {/* Left Column: Interactive Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <ImageGallery images={images} propertyName={name} />
          </div>

          {/* Right Column: Pricing, Specs, and Booking Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header Cards */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-soft space-y-4">
              
              {/* Type, Badges */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 border border-brand-100">
                  {type}
                </span>
                <div className="flex gap-2">
                  {featured && (
                    <span className="rounded-lg bg-accent-amber px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Location */}
              <div className="space-y-1.5">
                <h1 className="text-2xl font-black text-primary-950 leading-tight">
                  {name}
                </h1>
                <div className="flex items-start gap-1 text-primary-500 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-500 mt-0.5" />
                  <span>{location}, {city}</span>
                </div>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline justify-between border-t border-primary-100 pt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">Demand price</span>
                  <span className="text-3xl font-extrabold text-primary-950 tracking-tight">{priceDisplay}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">Area scale</span>
                  <p className="text-base font-bold text-primary-800">{area.toLocaleString()} sqft</p>
                </div>
              </div>

            </div>

            {/* Config Specs Block */}
            <div className="grid grid-cols-3 gap-3">
              {bedrooms > 0 && (
                <div className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-primary-100 bg-white shadow-soft text-center">
                  <span className="text-xs text-primary-400 font-semibold mb-1">Bedrooms</span>
                  <span className="text-base font-black text-primary-900">{bedrooms} BHK</span>
                </div>
              )}
              {bathrooms > 0 && (
                <div className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-primary-100 bg-white shadow-soft text-center">
                  <span className="text-xs text-primary-400 font-semibold mb-1">Bathrooms</span>
                  <span className="text-base font-black text-primary-900">{bathrooms} Baths</span>
                </div>
              )}
              <div className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-primary-100 bg-white shadow-soft text-center">
                <span className="text-xs text-primary-400 font-semibold mb-1">Unit Area</span>
                <span className="text-base font-black text-primary-900 flex items-center gap-0.5 justify-center">
                  {area} <span className="text-[10px] text-primary-500 font-normal">sqft</span>
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="rounded-2xl border border-primary-100 bg-white p-5 shadow-soft space-y-3.5">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white py-3.5 text-sm font-bold transition-all shadow-md active:scale-98"
              >
                <Phone className="h-4.5 w-4.5" />
                Contact Property Agent
              </button>
              
              <button
                onClick={() => {
                  toggleFavorite(property.id);
                }}
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-all active:scale-98 ${
                  isFavorite(property.id)
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-primary-200 bg-white text-primary-700 hover:bg-primary-50'
                }`}
              >
                Save listing to Favorites
              </button>
            </div>

            {/* Key Trust Notes */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 flex gap-3 text-xs leading-relaxed text-emerald-800">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <strong className="font-bold text-emerald-900">Realistae Verified Partner</strong>
                <p className="mt-0.5 text-emerald-700">This property is RERA-registered and documents have been checked. Site visits are free of cost.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Section: Description, Amenities & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Description */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 md:p-8 shadow-soft">
              <h2 className="text-lg md:text-xl font-bold text-primary-950 border-b border-primary-50 pb-4 mb-4">
                Property Overview
              </h2>
              <p className="text-sm md:text-base text-primary-700 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 md:p-8 shadow-soft">
              <h2 className="text-lg md:text-xl font-bold text-primary-950 border-b border-primary-50 pb-4 mb-5">
                Premium Amenities & Facilities
              </h2>
              <Amenities list={amenities} />
            </div>

          </div>

          {/* Right side Metadata column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Listing Summary Data Table */}
            <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-soft">
              <h3 className="text-base font-bold text-primary-950 border-b border-primary-50 pb-3.5 mb-4">
                Listing Factsheet
              </h3>
              <div className="space-y-3.5 text-sm">
                
                <div className="flex justify-between border-b border-primary-50 pb-2">
                  <span className="text-primary-400 font-semibold">Listed Date</span>
                  <span className="font-medium text-primary-800 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-500" />
                    {new Date(listedDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex justify-between border-b border-primary-50 pb-2">
                  <span className="text-primary-400 font-semibold">City Area</span>
                  <span className="font-semibold text-primary-800">{city}</span>
                </div>

                <div className="flex justify-between border-b border-primary-50 pb-2">
                  <span className="text-primary-400 font-semibold">Configuration</span>
                  <span className="font-semibold text-primary-800">
                    {bedrooms > 0 ? `${bedrooms} BHK BHK Unit` : 'Commercial Space'}
                  </span>
                </div>

                <div className="flex justify-between border-b border-primary-50 pb-2">
                  <span className="text-primary-400 font-semibold">Super Area</span>
                  <span className="font-semibold text-primary-800 flex items-center gap-1">
                    <Ruler className="h-4 w-4 text-brand-500" />
                    {area.toLocaleString()} Sq.Ft.
                  </span>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-primary-400 font-semibold">Complete Address</span>
                  <span className="font-medium text-primary-800 text-xs leading-relaxed">
                    {address}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Section: Related Listings */}
        <RelatedProperties properties={related} />

      </div>

      {/* Booking Form Contact Overlay */}
      <ContactAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
      />

    </div>
  );
};

export default PropertyDetails;
