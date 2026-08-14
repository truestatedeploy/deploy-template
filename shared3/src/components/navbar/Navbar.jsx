import { useEffect, useState } from "react";
import { Phone, Xmark, MenuScale } from "iconoir-react";
import { useConfig } from "../../ConfigContext";

const NAV_LINKS = [
  { name: "Overview", href: "#overview" },
  { name: "Investment", href: "#investment" },
  { name: "Pricing", href: "#pricing" },
  { name: "Location", href: "#location" },
  { name: "Amenities", href: "#amenities" },
  { name: "Gallery", href: "#gallery" },
  { name: "Builder", href: "#builder" },
];

export const Navbar = ({ openContactModal }) => {
  const config = useConfig();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = config.phone || "+919739155677";

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]" : "bg-white/92 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 flex-shrink-0">
          {config.logo_image ? (
            <img src={config.logo_image} alt={config.builder || config.project_name} className="h-8" />
          ) : (
            <div className="w-7 h-7 rounded flex items-center justify-center bg-primary">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="4" height="4" rx="0.5" fill="white" />
                <rect x="7" y="1" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.6" />
                <rect x="1" y="7" width="4" height="4" rx="0.5" fill="white" fillOpacity="0.6" />
                <rect x="7" y="7" width="4" height="4" rx="0.5" fill="white" />
              </svg>
            </div>
          )}
          <div>
            <div className="text-[15px] font-bold tracking-tight text-ink uppercase">
              {config.project_name || "Project Name"}
            </div>
            <div className="text-[11px] font-medium tracking-widest uppercase text-ink/80 mt-0.5">
              by {config.builder || "Builder"}
            </div>
          </div>
        </a>

        <div className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="px-3 py-1.5 text-[14px] font-medium rounded-md text-ink hover:opacity-80 hover:bg-surface transition-all"
            >
              {l.name}
            </a>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
          <a href={`tel:${phone}`} className="flex items-center gap-2.5 text-[15px] font-semibold px-6 py-2.5 rounded-md text-white bg-primary hover:opacity-90 transition-opacity">
            <Phone className="w-5 h-5" /> {phone}
          </a>
          <button
            onClick={() => openContactModal()}
            className="text-[15px] font-semibold px-7 py-2.5 rounded-md text-white bg-primary hover:opacity-90 transition-opacity"
          >
            Enquire
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="xl:hidden p-2 rounded-md text-ink">
          {open ? <Xmark className="w-5 h-5" /> : <MenuScale className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-2.5 text-[15px] font-medium rounded-md text-ink hover:bg-surface transition-colors"
            >
              {l.name}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); openContactModal(); }}
            className="mt-2 w-full py-3 text-sm font-semibold text-white rounded-md bg-primary"
          >
            Enquire Now
          </button>
        </div>
      )}
    </nav>
  );
};
