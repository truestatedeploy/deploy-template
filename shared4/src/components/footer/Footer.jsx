import { useConfig } from "../../ConfigContext";

const DEFAULT_DISCLAIMER =
  "Prices subject to change without notice. All images are for representational purposes only.";

export const Footer = () => {
  const config = useConfig();
  const marketingPartner = config.marketing_partner_name || "IQOL Technologies Pvt. Ltd.";
  const initial = (config.project_name || "P").trim().charAt(0).toUpperCase();

  return (
    <footer className="bg-ink border-t border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center text-white text-xs font-bold bg-primary">
                {initial}
              </div>
              <span className="text-sm font-semibold text-white font-display">
                {config.project_name || "Project Name"}
              </span>
            </div>
            {config.rera && (
              <p className="text-xs leading-relaxed text-white/45">RERA Reg. No.: {config.rera}</p>
            )}
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-3 text-white/40">Contact</p>
            {config.phone && <p className="text-sm mb-1 text-white/70">{config.phone}</p>}
            {config.whatsapp_phone && <p className="text-sm text-white/70">WhatsApp: {config.whatsapp_phone}</p>}
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-3 text-white/40">Address</p>
            {config.location_address && (
              <p className="text-sm leading-relaxed text-white/70">{config.location_address}</p>
            )}
          </div>
        </div>

        <div className="pb-6 mb-6 border-b border-white/[0.08]">
          <p className="text-xs tracking-widest uppercase mb-2 text-white/40">Marketed By</p>
          <p className="text-sm font-semibold text-white">{marketingPartner}</p>
          <p className="text-sm mt-1 text-white/60">
            Authorized Marketing Partner for{" "}
            <span className="font-medium text-white/80">{config.builder || "the developer"}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {config.builder || marketingPartner}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">{config.footer_disclaimer || DEFAULT_DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
};
