import defaultHero from "../assets/sobhahos.png";
import Button from "../components/button/buttonMain";
import homeLocation from "../assets/home/location.svg";
import { useEffect, useState } from "react";
import { useLeadTracking, LEAD_SOURCES } from '../hooks/useLeadTracking';
import { useConfig } from '../ConfigContext';


const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

export const Home = ({ openContactModal }) => {
  const config = useConfig();
  const isMobile = useIsMobile();
  const { trackButtonClick } = useLeadTracking();
  const heroImg = config.hero_image || defaultHero;

  const overlayStyle = {
    backgroundImage: isMobile
      ? "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.55) 100%)"
      : "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 100%), linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 32%)",
  };

  return (
    // Main container for the Home section
    <div
      id="Home"
      className="relative w-full min-h-[72vh] sm:min-h-[85vh] mt-14 md:mt-[4.5rem] overflow-hidden"
    >
      {/* Background image with a slow Ken Burns zoom */}
      <img
        src={heroImg}
        alt={config.project_name}
        className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
        style={{ objectPosition: isMobile ? "30% center" : "15% 25%" }}
      />

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0" style={overlayStyle}></div>

      <div className="relative z-10 flex flex-col justify-center min-h-[72vh] sm:min-h-[85vh] w-full items-center gap-8">
        {/* Content Section — same container as the page sections so edges line up */}
        <div className="w-full px-5 md:px-[7.5rem]">
          <div className="relative w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left text-white gap-7 md:gap-9 pb-[45%] sm:pb-0">
            {/* Accent bar (sits in the left gutter so it doesn't push the content) */}
            <div
              className="hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2 h-56 w-1.5 rounded-full bg-gradient-to-b from-magenta to-magenta/0 animate-hero-1"
            ></div>

            <div className="flex gap-4 flex-col w-full">
              {/* Location eyebrow on mobile (desktop uses the floating pin card) */}
              {config.location_city && (
                <span className="sm:hidden animate-hero-1 inline-flex items-center justify-center gap-2 text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/85">
                  {config.location_city}
                </span>
              )}

              {/* Main Title */}
              <h1 className="animate-hero-2 font-body text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                {config.project_name}
              </h1>

              {/* Subtitle */}
              {config.tagline && (
                <p className="animate-hero-2 font-body text-gray-100 md:text-2xl text-sm font-light leading-relaxed lg:w-4/6 mx-auto lg:mx-0">
                  {config.tagline}
                </p>
              )}
            </div>

            {/* Enquire Now Button using the reusable Button component */}
            <div className="animate-hero-3">
              <Button
                text="Enquire Now!"
                onClick={() => {
                  trackButtonClick(LEAD_SOURCES.HERO, 'enquire_now', 'Hero Banner CTA');
                  openContactModal(LEAD_SOURCES.HERO);
                }} // Toggle contact modal on button click
              />
            </div>
          </div>
        </div>

        {/* Right-side content (Location card) */}
        <div className="hidden absolute sm:block top-[62%] right-0 md:mt-0 z-10 animate-hero-3">
          <div className="flex gap-3 bg-white/95 backdrop-blur-md shadow-xl rounded-l-2xl items-center md:px-8 md:py-5 px-4 py-4 border-l-4 border-magenta">
            <div className="flex items-center justify-center h-9 w-9 md:h-11 md:w-11 rounded-full bg-magenta/10 shrink-0">
              <img
                src={homeLocation} // Location icon
                alt="Location"
                className="h-4 md:h-5"
              />
            </div>
            <p className="max-w-96 font-body text-left text-gray-900 md:text-xl text-sm font-semibold leading-[130%]">
              {config.location_city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
