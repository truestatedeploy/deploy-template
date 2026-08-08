import { useConfig } from "../../ConfigContext";

export const Footer = () => {
  const config = useConfig();
  const marketingPartner = config.marketing_partner_name || "IQOL Technologies Pvt. Ltd.";

  return (
    <footer className="py-14 bg-[#0F172A] text-[#94A3B8]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-primary">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <rect x="1" y="1" width="3" height="3" rx="0.5" fill="white" />
                  <rect x="6" y="1" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.6" />
                  <rect x="1" y="6" width="3" height="3" rx="0.5" fill="white" fillOpacity="0.6" />
                  <rect x="6" y="6" width="3" height="3" rx="0.5" fill="white" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white uppercase">{config.project_name || "Project Name"}</span>
            </div>
            <p className="text-sm leading-relaxed">
              A premium residential development by {config.builder || "the builder"} in {config.location_area || config.location_city || "your city"}.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-white/25">Contact</div>
            <div className="space-y-2.5 text-sm">
              {config.phone && <div>Phone: {config.phone}</div>}
              {config.whatsapp_phone && <div>WhatsApp: {config.whatsapp_phone}</div>}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-white/25">Legal</div>
            <div className="space-y-2.5 text-sm">
              {config.rera && <div>RERA: {config.rera}</div>}
              {config.brochure_url && (
                <a href={config.brochure_url} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pb-8 mb-8 border-b border-white/[0.08]">
          <div className="text-[11px] font-semibold uppercase tracking-widest mb-2 text-white/25">Marketed By</div>
          <p className="text-sm font-semibold text-white">{marketingPartner}</p>
          <p className="text-sm mt-1">
            Authorized Marketing Partner for{" "}
            <span className="capitalize font-medium text-white/80">{config.builder || "the developer"}</span>
          </p>
        </div>

        <p className="text-[12px] leading-relaxed mb-4 text-gray-500">
          <strong className="text-gray-400">Disclaimer:</strong> This page is for information purposes only. All
          details including prices, configurations, and specifications are subject to change without prior notice.
          Buyers are advised to verify all information independently and consult legal and financial advisors before
          making investment decisions. RERA registration does not constitute any approval or recommendation by any
          government authority. Prices are indicative.
        </p>
        <div className="text-[12px] text-gray-600">
          © {new Date().getFullYear()} {marketingPartner}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
