import { useConfig } from "../ConfigContext";

export const Gallery = () => {
  const config = useConfig();
  const images = config.gallery_images?.length > 0 ? config.gallery_images : [];

  if (!images.length) return null;

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-10">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Gallery</div>
          <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-ink">Project Visuals</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className={`group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 ${
                i === 0 || i === images.length - 1 ? "lg:col-span-2" : ""
              }`}
            >
              <img
                src={src}
                alt={`${config.project_name || "Project"} gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
