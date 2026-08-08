import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import pic3 from '../assets/gallery/embassy5.webp'
import pic4 from '../assets/gallery/xyz1.jpg'
import pic9 from '../assets/gallery/31.jpg'
import pic14 from '../assets/embassyastra2.jpg'
import pic15 from '../assets/embassyastra4.jpg'
import pic16 from '../assets/2, 3 & 4 BHK Luxury Apartments (4).png'
import pic17 from '../assets/test.png'
import { useConfig } from '../ConfigContext';

const DEFAULT_GALLERY = [pic3, pic16, pic17, pic4, pic14, pic9, pic15];

const ArrowLeft = () => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowRight = () => (
  <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="1.4em" height="1.4em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Gallery = () => {
  const config = useConfig();
  const photos = config.gallery_images?.length > 0 ? config.gallery_images : DEFAULT_GALLERY;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visible = photos.slice(0, 6);
  const remaining = photos.length - visible.length;

  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    // Lock background scroll while the full-screen viewer is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, prev, next]);

  return (
    <div className="px-5 md:px-[7.5rem] bg-white py-14 md:py-24" id="Gallery">
      <div className='text-4xl md:text-5xl font-semibold font-subheading w-full text-gray-900 tracking-tight mb-6 md:mb-10'>
        Gallery
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {visible.map((photo, index) => {
          const isLast = index === visible.length - 1 && remaining > 0;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={isLast ? `View all ${photos.length} photos` : `View photo ${index + 1}`}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {isLast ? (
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-xl md:text-3xl font-bold tracking-tight">+{remaining} Photos</span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Full-screen lightbox (portaled to body so it covers the navbar too) */}
      {lightboxIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center px-16 md:px-24 py-10 animate-modal-fade"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <CloseIcon />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-8 z-20 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ArrowLeft />
          </button>

          <img
            src={photos[lightboxIndex]}
            alt={`Photo ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full object-contain rounded-lg shadow-2xl animate-modal-pop"
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-3 md:right-8 z-20 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ArrowRight />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-body">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
