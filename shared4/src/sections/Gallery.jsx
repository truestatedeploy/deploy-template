import { useConfig } from "../ConfigContext";

export const Gallery = () => {
  const config = useConfig();
  const images = config.gallery_images?.length > 0 ? config.gallery_images : [];

  if (!images.length) return null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-surfaceSoft">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2 text-ink/60">Gallery</p>
          <h2 className="text-4xl md:text-5xl text-ink font-display">See Life Here</h2>
        </div>

        {/* Desktop: asymmetric grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3" style={{ height: "560px" }}>
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group bg-gray-200">
            <img src={images[0]} alt={`${config.project_name || "Project"} gallery 1`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          {images.slice(1, 3).map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden relative group bg-gray-200">
              <img src={src} alt={`${config.project_name || "Project"} gallery ${i + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-3">
          {images.slice(0, 4).map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden w-full bg-gray-200" style={{ aspectRatio: "4/3" }}>
              <img src={src} alt={`${config.project_name || "Project"} gallery ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {images.length > 3 && (
          <div className="hidden md:grid grid-cols-2 gap-3 mt-3" style={{ height: "280px" }}>
            {images.slice(3, 5).map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden relative group bg-gray-200">
                <img src={src} alt={`${config.project_name || "Project"} gallery ${i + 4}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
