import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

/**
 * Premium Image Gallery with thumbnails and next/prev controls.
 * 
 * @param {Object} props
 * @param {Array<string>} props.images - Array of image URLs
 * @param {string} props.propertyName - Name of the property (for alt tags)
 */
export const ImageGallery = ({ images = [], propertyName = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded-2xl bg-primary-100 text-primary-400">
        <ImageIcon className="h-12 w-12 mb-2 stroke-[1.5]" />
        <span className="text-sm">No images available</span>
      </div>
    );
  }

  const handlePrev = (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-3">
      
      {/* Main Image Viewer */}
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-primary-100 bg-primary-950 shadow-soft">
        <img
          src={images[activeIndex]}
          alt={`${propertyName} - View ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300 ease-in-out"
        />

        {/* Dark subtle overlay for button readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>

        {/* Navigation Buttons (hidden on hover on desktop, always visible on mobile/tablet) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-800 hover:bg-white hover:text-brand-600 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-800 hover:bg-white hover:text-brand-600 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white tracking-wider">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Selector Row */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((url, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              type="button"
              className={`relative aspect-[16/10] w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 bg-primary-100 ${
                index === activeIndex
                  ? 'border-brand-600 scale-[0.98]'
                  : 'border-transparent hover:border-primary-300 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image number ${index + 1}`}
            >
              <img
                src={url}
                alt={`${propertyName} thumb ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default ImageGallery;
