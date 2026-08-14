// Mobile-only sticky "Enquire Now" bar — matches the Figma source's
// MobileStickyCTA exactly (simple button, md:hidden, opens the same contact
// modal every other CTA uses) rather than shared3's wider >1600px desktop
// side-panel form, which has no equivalent in this template's design.
export const StickyEnquiry = ({ show, openContactModal }) => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2 transition-transform duration-300"
      style={{
        background: "linear-gradient(to top, rgba(247,247,245,0.98) 60%, transparent)",
        transform: show ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <button
        onClick={() => openContactModal()}
        className="w-full py-4 rounded-full font-semibold text-base shadow-lg text-white bg-primary hover:opacity-90 transition-opacity"
      >
        Enquire Now
      </button>
    </div>
  );
};
