import React from 'react';
import Button from '../button/buttonMain';  // Reusable button component
import contactbanner from '../../assets/footer/footer.webp';
import { useLeadTracking, LEAD_SOURCES } from '../../hooks/useLeadTracking';
import { useConfig } from '../../ConfigContext';

// Footer Component
export const Footer = ({ openContactModal }) => {
  const { trackButtonClick } = useLeadTracking();
  const config = useConfig();
  const builder = config.builder || 'the developer';
  const phone = config.phone;
  const year = new Date().getFullYear();

  // Collect every RERA number from the config (legacy `rera` + `rera1`..`reraN`),
  // trim, drop blanks, and dedupe so repeated/empty slots don't show.
  const reraNumbers = [
    ...new Set(
      Object.keys(config)
        .filter((key) => /^rera\d*$/.test(key))
        .sort()
        .map((key) => (typeof config[key] === 'string' ? config[key].trim() : ''))
        .filter(Boolean)
    ),
  ];

  // Styles for the background image
  const opacBackground = {
    backgroundImage: `url(${contactbanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // Overlay gradient to darken the background for better readability
  const overlayStyle = {
    backgroundImage:
      'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%)',
  };

  return (
    <div className="relative">
      
      {/* Contact Section */}
      <div className="text-white border-t border-gray-700 h-auto" style={opacBackground}>
        <div style={overlayStyle} className="mx-auto">

          {/* Call to Action Section */}
          <div className="flex flex-col text-center gap-6 md:gap-10 items-center justify-center mx-auto pt-32 pb-16 md:pt-36 md:pb-24 lg:h-[60vh] w-full">
            
            {/* Section Heading */}
            <div className="text-2xl md:text-5xl max-w-3xl font-semibold font-heading leading-tight tracking-tight">
              Looking To Get In Touch With Us?
            </div>
            
            {/* Button to trigger Contact Modal */}
            <div className="">
              <Button 
                text="ENQUIRE NOW!" 
                className="text-center my-2 md:my-6 h-fit md:py-4 md:px-16 py-3 px-8 w-fit scroll-to-top" 
                onClick={() =>{ 
                  trackButtonClick(LEAD_SOURCES.FOOTER, 'fill_form', 'Footer Section CTA');
                  openContactModal(LEAD_SOURCES.FOOTER);
                }} 
                showArrow={false}
              />
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="bg-[#141414] text-white w-full">
        <div className="w-full px-5 md:px-[7.5rem] py-10 md:py-12">

          {/* Brand + quick links */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-white/10">
            <div className="text-center md:text-left">
              <p className="font-heading text-xl md:text-2xl font-semibold tracking-tight">
                IQOL Technologies Pvt. Ltd.
              </p>
              <p className="text-sm text-white/55 mt-1.5 font-body">
                Authorized Marketing Partner for <span className="text-white/80 font-medium capitalize">{builder}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 font-body text-sm">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="text-white/80 hover:text-magenta transition-colors duration-300"
                >
                  {phone}
                </a>
              )}
              <button className="text-white/80 hover:text-magenta transition-colors duration-300">
                Privacy Policy
              </button>
            </div>
          </div>

          {/* RERA */}
          {reraNumbers.length > 0 && (
            <div className="text-xs md:text-sm text-white/45 leading-relaxed font-body mt-7 max-w-4xl mx-auto md:mx-0 text-center md:text-left">
              <span className="font-semibold text-white/65">
                {reraNumbers.length > 1 ? 'RERA Nos.:' : 'RERA No.:'}
              </span>{' '}
              {reraNumbers.map((number, index) => (
                <span key={number}>
                  {index > 0 && <span className="text-white/25"> | </span>}
                  {number}
                </span>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs md:text-sm text-white/45 leading-relaxed font-body mt-7 max-w-4xl mx-auto md:mx-0 text-center md:text-left">
            <span className="font-semibold text-white/65">Disclaimer:</span>{' '}
            This website is not an official site; it belongs to the authorized channel partner and is for informational purposes only.
          </p>

          {/* Copyright */}
          <p className="text-xs text-white/35 font-body mt-7 text-center md:text-left">
            © {year} IQOL Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
