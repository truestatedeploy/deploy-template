import { useConfig } from "../ConfigContext";

export const Builder = ({ openContactModal }) => {
  const config = useConfig();
  const initial = (config.builder || "B").trim().charAt(0).toUpperCase();

  return (
    <section id="builder" className="py-16 md:py-24 bg-surfaceSoft border-t border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl">
          <p className="text-xs tracking-widest uppercase mb-6 text-ink/60">Built By</p>
          <div className="flex items-center gap-4 mb-6">
            {config.builder_logo_url ? (
              <img src={config.builder_logo_url} alt={config.builder} className="w-12 h-12 rounded-xl object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg bg-primary">
                {initial}
              </div>
            )}
            <div>
              <p className="text-2xl font-semibold text-ink font-display">{config.builder || "Builder Name"}</p>
              {config.location_state && (
                <p className="text-xs tracking-wide mt-0.5 text-ink/60">Based in {config.location_state}</p>
              )}
            </div>
          </div>
          {config.builder_description && (
            <p className="text-base leading-relaxed text-ink/70">{config.builder_description}</p>
          )}
          <button
            onClick={() => openContactModal()}
            className="mt-8 px-6 py-3 rounded-full font-medium text-sm text-white bg-primary hover:opacity-90 transition-opacity"
          >
            Enquire About This Project
          </button>
        </div>

        {config.gallery_images?.length > 0 && (
          <div className="rounded-2xl overflow-hidden bg-gray-200" style={{ aspectRatio: "4/3" }}>
            <img src={config.gallery_images[config.gallery_images.length - 1]} alt={config.builder} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};
