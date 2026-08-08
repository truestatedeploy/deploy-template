import { useEffect, useState } from "react";
import { Phone, Xmark, MenuScale } from "iconoir-react";
import defaultLogo from "../../assets/Sobha-Realty-Transparent-logo-Click-on-reality.webp";
import { Link } from "react-router-dom";
import arrow from "../../assets/navbar/whitearrow.png";
import { useConfig } from '../../ConfigContext';

// Banner component
export const Banner = ({ setContactModal }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this width as per your definition of "mobile"
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // return (
  //   (isBannerVisible) && (
  //     <div className="w-screen bg-black text-white text-center p-[10px] flex justify-center items-center gap-[16px] max-h-[40px] z-30">
  //       <span className={`font-sans font-semibold ${isMobile ? "text-[14px] leading-[14px]" : "text-[18px] leading-[17.63px]"}`}>
  //         Exclusive Pre-launch price and offers{" "}
  //       </span>
  //       <div className="flex items-center justify-center gap-[4px] cursor-pointer" onClick={() => setContactModal(true)}>
  //         <span className={`font-sans font-semibold ${isMobile ? "text-[14px] leading-[14px]" : "text-[18px] leading-[17.63px]"} hover:underline hover:decoration-white`}>Get it now</span>
  //         <img src={arrow} alt=""  className="w-5 h-4"/>
  //       </div>
  //       <button
  //         className={`absolute ${isMobile ? "right-2 hidden" : "right-4"} text-white`}
  //         onClick={() => setIsBannerVisible(false)}
  //       >
  //         <Xmark className="w-5 " />
  //       </button>
  //     </div>
  //   )
  // );
};

// Navbar component
export const Navbar = ({ sitevisitmodal, setSiteVisitModal, setContactModal }) => {
  const config = useConfig();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Function to toggle mobile navigation open/close state
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Navigation links data, can be easily modified to add/remove links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Overview", href: "/#Overview" },
    { name: "Pricing", href: "/#Pricing" },
    { name: "Master Plan", href: "/#MasterPlan" },
    { name: "Location", href: "/#Location" },
    { name: "Amenities", href: "/#Amenities" },
    { name: "Gallery", href: "/#Gallery" },
  ];

  if (config.blog && config.blog.posts && config.blog.posts.length > 0) {
    navLinks.push({ name: config.blog.nav_tab_name || "Blog", href: "/blog" });
  }

  return (
      <div className="font-body fixed w-full z-20 top-0 start-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <Banner setContactModal={setContactModal} />
        <div className="w-full px-5 md:px-[7.5rem] flex flex-wrap items-center justify-between py-[8px] z-40 ">
          {/* Logo Section */}
          <a
            href="/"
            className="flex items-center px-4 md:p-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={config.logo_image || defaultLogo}
              className="h-10 sm:h-12 md:h-14"
              alt={config.builder || config.project_name}
            />
          </a>

          {/* Right cluster on mobile: Call button + menu toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${config.phone || '+919739155677'}`}
              className="flex items-center bg-magenta text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md active:bg-magentaDark transition-colors duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />{(config.phone || '+919739155677').replace('+91', '')}
            </a>
            <button
              type="button"
              onClick={toggleMobileNav}
              className="inline-flex items-center w-10 h-10 justify-center text-black hover:bg-skyblue2Color focus:outline-none"
              aria-expanded={isMobileNavOpen ? "true" : "false"}
            >
              <span className="sr-only">
                {isMobileNavOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isMobileNavOpen ? (
                <Xmark className="w-8 h-8" />
              ) : (
                <MenuScale className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`items-center md:flex ${
              isMobileNavOpen
                ? "flex w-full bg-white border-t border-gray-100 mt-3 pb-2"
                : "hidden"
            }`}
            id="navbar-sticky"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <ul className="flex flex-col p-4 md:p-0 md:flex-row gap-1 md:gap-8 lg:gap-10 w-full justify-between md:items-center">
              {navLinks.map((link, index) => {
                const linkClass =
                  "block border-b md:border-0 border-gray-100 py-3 md:py-0 font-semibold text-sm md:text-xs lg:text-sm uppercase tracking-wider text-gray-800 hover:text-magenta transition-colors duration-300";
                // Hash anchors use a plain <a> so the browser scrolls to the
                // section; pure route paths use router Link for SPA navigation.
                const isAnchor = link.href.includes("#");
                return (
                  <li key={index}>
                    {isAnchor ? (
                      <a href={link.href} className={linkClass}>
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className={linkClass}>
                        {link.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Call Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${config.phone || '+919739155677'}`}
              className="flex items-center bg-magenta text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-magentaDark hover:shadow-lg transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />{(config.phone || '+919739155677').replace('+91', '')}
            </a>
          </div>
        </div>
      </div>
  );
};
