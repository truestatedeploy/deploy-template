import { useEffect, useState } from "react";
import { Phone } from "iconoir-react";
import { useConfig } from "../../ConfigContext";

const NAV_LINKS = [
  { name: "Overview", href: "#overview" },
  { name: "Residences", href: "#pricing" },
  { name: "Amenities", href: "#amenities" },
  { name: "Master Plan", href: "#master-plan" },
  { name: "Location", href: "#location" },
  { name: "Gallery", href: "#gallery" },
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

  const initial = (config.project_name || "P").trim().charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surfaceSoft/95 backdrop-blur-md border-b border-gray-200" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 min-w-0">
          {config.logo_image ? (
            <img src={config.logo_image} alt={config.builder || config.project_name} className="h-10 w-10 object-contain rounded-md flex-shrink-0" />
          ) : (
            <div className="w-10 h-10 rounded-md flex items-center justify-center text-white text-base font-bold bg-primary flex-shrink-0">
              {initial}
            </div>
          )}
          <span className="text-base md:text-lg font-semibold tracking-tight text-ink font-display truncate">
            {config.project_name || "Project Name"}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink/65 hover:text-ink transition-colors"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {config.phone && (
            <a
              href={`tel:${config.phone}`}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white bg-primary hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" /> {config.phone}
            </a>
          )}
          <button
            onClick={() => openContactModal()}
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-medium text-white bg-primary hover:opacity-90 transition-opacity"
          >
            Enquire Now
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 rounded bg-ink" />
            <span className="block w-5 h-0.5 rounded bg-ink" />
            <span className="block w-3.5 h-0.5 rounded bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-surfaceSoft border-t border-gray-200">
          <div className="px-6 py-5 space-y-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block text-sm text-ink"
                onClick={() => setOpen(false)}
              >
                {l.name}
              </a>
            ))}
            {config.phone && (
              <a
                href={`tel:${config.phone}`}
                className="flex items-center gap-2 text-sm font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                <Phone className="w-4 h-4" /> {config.phone}
              </a>
            )}
            <button
              onClick={() => { setOpen(false); openContactModal(); }}
              className="w-full py-3 rounded-full text-sm font-medium mt-2 text-white bg-primary"
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
