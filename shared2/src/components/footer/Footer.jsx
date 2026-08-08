import React from 'react';
import { useLeadTracking, LEAD_SOURCES } from '../../hooks/useLeadTracking';
import { useConfig } from '../../ConfigContext';

const DEFAULT_QUICK_LINKS = [
  { label: 'Overview', href: '#Overview' },
  { label: 'Amenities', href: '#Amenities' },
  { label: 'Master Plan', href: '#MasterPlan' },
  { label: 'Floor Plans', href: '#Pricing' },
  { label: 'Location', href: '#Location' },
  { label: 'Gallery', href: '#Gallery' },
];

// Footer Component
export const Footer = ({ openContactModal }) => {
  const { trackButtonClick } = useLeadTracking();
  const config = useConfig();

  const builder = config.builder || 'the developer';
  const phone = config.phone;
  const whatsappPhone = config.whatsapp_phone;
  const marketingPartner = config.marketing_partner_name || 'IQOL Technologies Pvt. Ltd.';
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

  const ctaHeading = config.footer_cta_heading || 'Get Priority Access.';
  const ctaSubtext =
    config.footer_cta_subtext ||
    'Be the first to receive pricing, payment plans, and unit availability before the public launch. Limited slots for early-bird invitees.';
  const ctaButton = config.footer_cta_button || 'Register Now';
  const quickLinks = config.footer_links || DEFAULT_QUICK_LINKS;

  const eyebrow =
    'font-detail text-xs font-semibold uppercase tracking-[0.22em] text-magenta';

  const handleRegister = () => {
    trackButtonClick(LEAD_SOURCES.FOOTER, 'register', 'Footer Early Access CTA');
    openContactModal(LEAD_SOURCES.FOOTER);
  };

  return (
    <div className="bg-[#141414]">
      {/* Early-access CTA */}
      <section className="text-white px-5 md:px-[7.5rem] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.08]">
              {ctaHeading}
            </h2>
            <p className="mt-5 max-w-md font-body text-base md:text-lg text-white/60 leading-relaxed">
              {ctaSubtext}
            </p>
          </div>
          <div className="lg:justify-self-start">
            <button
              type="button"
              onClick={handleRegister}
              className="flex items-center justify-center rounded-lg bg-magenta px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-magentaDark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            >
              {ctaButton}
            </button>
            <p className="mt-5 max-w-md font-body text-xs text-white/45 leading-relaxed">
              By submitting, you agree to be contacted by our team. Your
              information is kept private and never shared.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white border-t border-magenta/70">
        <div className="w-full px-5 md:px-[7.5rem] py-14 md:py-16">
          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {/* Brand + address */}
            <div>
              <h3 className="font-display text-2xl md:text-[1.75rem] font-medium tracking-tight">
                {config.project_name}
              </h3>
              {config.location_address && (
                <p className="mt-5 font-body text-sm md:text-base text-white/55 leading-relaxed max-w-xs">
                  {config.location_address}
                </p>
              )}
              <p className="mt-4 font-body text-sm text-white/45">
                <span className="font-semibold text-white/70">
                  {reraNumbers.length > 1 ? 'RERA Nos.:' : 'RERA No.:'}
                </span>{' '}
                {reraNumbers.length > 0 ? (
                  reraNumbers.map((number, index) => (
                    <span key={number} className="text-white/85 font-medium">
                      {index > 0 && <span className="text-white/25"> | </span>}
                      {number}
                    </span>
                  ))
                ) : (
                  <span className="text-white/85 font-medium">
                    {config.rera_status || 'To be updated (pre-launch)'}
                  </span>
                )}
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className={eyebrow}>Contact</p>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="mt-4 block font-body text-xl md:text-2xl font-semibold hover:text-magenta transition-colors duration-300"
                >
                  {phone}
                </a>
              )}
              {whatsappPhone && (
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-body text-sm md:text-base text-white/60 hover:text-magenta transition-colors duration-300"
                >
                  WhatsApp · Chat with us
                </a>
              )}
            </div>

            {/* Quick links */}
            <div>
              <p className={eyebrow}>Quick Links</p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 font-body text-sm md:text-base">
                {quickLinks.map((link, index) =>
                  link.action === 'enquire' ? (
                    <button
                      key={index}
                      type="button"
                      onClick={handleRegister}
                      className="text-left text-white/60 hover:text-magenta transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={index}
                      href={link.href}
                      className="text-white/60 hover:text-magenta transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Marketed by */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className={eyebrow}>Marketed By</p>
              <p className="mt-2 font-body text-lg font-semibold">
                {marketingPartner}
              </p>
              <p className="font-body text-sm text-white/55">
                Authorized Marketing Partner for{' '}
                <span className="capitalize text-white/80 font-medium">{builder}</span>
              </p>
            </div>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="font-body text-lg md:text-xl font-semibold hover:text-magenta transition-colors duration-300"
              >
                {phone}
              </a>
            )}
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-body text-sm">
            <p className="text-white/35">
              © {year} {marketingPartner}. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-white/55">
              <a href="#" className="hover:text-magenta transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-white/25">·</span>
              <a href="#" className="hover:text-magenta transition-colors duration-300">
                Terms &amp; Conditions
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 font-body text-xs text-white/35 leading-relaxed max-w-5xl">
            <span className="font-semibold text-white/55">Disclaimer:</span>{' '}
            This website is not an official site; it belongs to the authorized
            channel partner and is for informational purposes only. All content,
            including project names, images and trademarks, belongs to the
            respective developer (
            <span className="capitalize">{builder}</span>). This site does not
            constitute an offer or contract.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
