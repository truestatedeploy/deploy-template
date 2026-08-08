import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import ContactForm from "./components/contact/ContactForm";
import { WhatsApp } from "./components/contact/WhatsApp";
import { StickyEnquiry } from "./components/contact/StickyEnquiry";
import { FAQWidget } from "./components/FAQ/FAQWidget";

import { Home } from "./sections/Home";
import { Features } from "./sections/Features";
import { Overview } from "./sections/Overview";
import Pricing from "./sections/Pricing";
import { Amenities } from "./sections/Amenities";
import { MasterPlan } from "./sections/MasterPlan";
import { Location } from "./sections/Location";
import { Gallery } from "./sections/Gallery";
import { Builder } from "./sections/Builder";
import { Blog } from "./sections/Blog";
import { BlogPost } from "./sections/BlogPost";
import { FinalCTA } from "./sections/FinalCTA";

import { useLeadTracking } from "./hooks/useLeadTracking";

const HomePage = ({ openContactModal }) => (
  <>
    <Home openContactModal={openContactModal} />
    <Features />
    <Overview openContactModal={openContactModal} />
    <Pricing openContactModal={openContactModal} />
    <Amenities />
    <MasterPlan openContactModal={openContactModal} />
    <Location />
    <Gallery />
    <Builder openContactModal={openContactModal} />
    <Blog />
    <FinalCTA openContactModal={openContactModal} />
  </>
);

export const PageRoute = () => {
  const [contactmodal, setContactModal] = useState(false);
  const [leadSource, setLeadSource] = useState(null);
  const [showSticky, setShowSticky] = useState(false);
  const { trackFormOpen } = useLeadTracking();

  const openContactModal = (source, propertyType = null) => {
    setLeadSource({ source, propertyType });
    setContactModal(true);
    trackFormOpen(source, "contact_form", propertyType);
  };

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 720);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ReactGA.send({
      hitType: "pageview",
      utmSource: params.get("utmSource"),
      utmMedium: params.get("utmMedium"),
      utmCampaign: params.get("utmCampaign"),
      gclid: params.get("gclid"),
    });
  }, []);

  return (
    <BrowserRouter>
      {contactmodal && (
        <ContactForm contactmodal={contactmodal} setContactModal={setContactModal} leadSource={leadSource} />
      )}

      <Navbar openContactModal={() => openContactModal("navbar")} />
      <WhatsApp showSticky={showSticky} />
      <FAQWidget showSticky={showSticky} openContactModal={() => openContactModal("faq")} />

      <Routes>
        <Route path="/" element={<HomePage openContactModal={openContactModal} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost openContactModal={openContactModal} />} />
      </Routes>

      <Footer />
      <StickyEnquiry show={showSticky} />
    </BrowserRouter>
  );
};
