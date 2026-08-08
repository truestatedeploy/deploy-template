import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import ReactGA from "react-ga4";

import { Home } from "./sections/Home";
import { Features } from "./sections/Features";
import { Location } from "./sections/Location";
import { Amenities } from "./sections/Amenities";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Overview } from "./sections/Overview";
import { WhatsApp } from "./components/contact/WhatsApp";
import Pricing from "./sections/Pricing";
import { MasterPlan } from "./sections/MasterPlan";
import { Gallery } from "./sections/Gallery";
import { Builder } from "./sections/Builder";
import { Blog } from "./sections/Blog";
import { BlogPost } from "./sections/BlogPost";
import ContactForm from "./components/contact/ContactForm";
import { FAQWidget } from "./components/FAQ/FAQWidget";
import { useLeadTracking } from "./hooks/useLeadTracking";
import { useLeadCaptured } from "./hooks/useLeadCapture";

// How long before the lead form first surfaces, and how often it re-surfaces
// afterwards, while the visitor hasn't enquired yet.
const LEAD_POPUP_INITIAL_DELAY_MS = 30000;
const LEAD_POPUP_INTERVAL_MS = 15000;

const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = React.useState(false);

  const props = useSpring({
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? "translateY(0)" : "translateY(20px)",
    config: { mass: 1, tension: 210, friction: 20 },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  );
};

// Reset scroll to the top whenever the route path changes (e.g. opening a blog
// article) so visitors don't land mid-page. Hash links keep their own scroll.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const PageRoute = () => {
  const [sitevisitmodal, setSiteVisitModal] = useState(false);
  const [contactmodal, setContactModal] = useState(false);
  const [leadSource, setLeadSource] = useState(null);
  const pageViewSentRef = useRef(false);

  const { trackFormOpen } = useLeadTracking();
  const leadCaptured = useLeadCaptured();

  // Whether the auto popup has surfaced at least once. The first appearance
  // waits the initial delay; every appearance after that uses the shorter
  // recurring interval.
  const hasSurfacedRef = useRef(false);

  const openContactModal = (source, propertyType = null) => {
    setLeadSource({ source, propertyType });
    setContactModal(true);
    trackFormOpen(source, 'contact_form', propertyType);
  };

  // Feature 1: until the visitor hands over their details, re-surface the lead
  // form. The first popup waits 30s after the visitor lands, then it re-surfaces
  // every 15s. While the popup is open the timer is frozen — we don't count down
  // behind an on-screen form. Closing it (without submitting) resumes the timer,
  // so the visitor always gets the full interval of breathing room before it
  // returns. Stops for good once captured.
  useEffect(() => {
    if (leadCaptured) return;
    // Freeze while the popup is on screen.
    if (contactmodal) return;

    const delay = hasSurfacedRef.current
      ? LEAD_POPUP_INTERVAL_MS
      : LEAD_POPUP_INITIAL_DELAY_MS;

    const timeoutId = setTimeout(() => {
      hasSurfacedRef.current = true;
      openContactModal("auto_popup_timer", null);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [leadCaptured, contactmodal]);

  useEffect(() => {
    if (pageViewSentRef.current) return;
    pageViewSentRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const source = params.get("utmSource");
    const medium = params.get("utmMedium");
    const campaign = params.get("utmCampaign");
    const keyword = params.get("utmKeyword");
    const gclid = params.get("gclid");

    ReactGA.send({
      hitType: "pageview",
      utmSource: source,
      utmMedium: medium,
      utmCampaign: campaign,
      utmKeyowrd: keyword,
      gclid: gclid,
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* {sitevisitmodal && (
        <SiteVisitForm
          sitevisitmodal={sitevisitmodal}
          setSiteVisitModal={setSiteVisitModal}
        />
      )} */}
      {contactmodal && (
        <ContactForm
          contactmodal={contactmodal}
          setContactModal={setContactModal}
          setSiteVisitModal={setSiteVisitModal}
          leadSource={leadSource}
        />
      )}

      <Navbar
        sitevisitmodal={sitevisitmodal}
        setSiteVisitModal={setSiteVisitModal}
        openContactModal={openContactModal}
      />

      <WhatsApp />
      <FAQWidget openContactModal={openContactModal} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RevealOnScroll>
                <Home
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
              <RevealOnScroll>
                <Features />
              </RevealOnScroll>
              {/* <RevealOnScroll>
                { <Highlights /> }
              </RevealOnScroll> */}
              <RevealOnScroll>
                <Overview
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
              <RevealOnScroll>
                <Pricing
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
              <RevealOnScroll>
                <MasterPlan
                  openContactModal={openContactModal}
                />
                <RevealOnScroll>
                  <Location />
                </RevealOnScroll>
              </RevealOnScroll>
              <RevealOnScroll>
                <Amenities />
              </RevealOnScroll>
              <RevealOnScroll>
                <Gallery />
              </RevealOnScroll>
              <RevealOnScroll>
                <Builder />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/Home"
          element={
            <>
              <RevealOnScroll>
                <Home
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/Features"
          element={
            <>
              <RevealOnScroll>
                <Features />
              </RevealOnScroll>
            </>
          }
        />
        {/* <Route path="/Highlights" element={
          <>
            <RevealOnScroll>
              <Highlights />
            </RevealOnScroll>
          </>
        } /> */}
        <Route
          path="/Overview"
          element={
            <>
              <RevealOnScroll>
                <Overview
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/Pricing"
          element={
            <>
              <RevealOnScroll>
                <Pricing
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/MasterPlan"
          element={
            <>
              <RevealOnScroll>
                <MasterPlan
                  openContactModal={openContactModal}
                />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/Location"
          element={
            <>
              <RevealOnScroll>
                <Location />
              </RevealOnScroll>
            </>
          }
        />

        <Route
          path="/Amenities"
          element={
            <>
              <RevealOnScroll>
                <Amenities />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/Gallery"
          element={
            <>
              <RevealOnScroll>
                <Gallery />
              </RevealOnScroll>
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <RevealOnScroll>
              <Blog />
            </RevealOnScroll>
          }
        />
        <Route
          path="/blog/:slug"
          element={<BlogPost openContactModal={openContactModal} />}
        />
      </Routes>
      <Footer openContactModal={openContactModal} />
    </BrowserRouter>
  );
};