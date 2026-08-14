import { useConfig } from "../ConfigContext";

const getSpecs = (config) => {
  if (Array.isArray(config.features) && config.features.length > 0) {
    return config.features.map((f) => ({ value: f.value, unit: "", label: f.title }));
  }
  if (Array.isArray(config.specs) && config.specs.length > 0) return config.specs;
  return [];
};

// Size the grid to however many specs actually exist.
const colsForCount = (n) => {
  if (n <= 2) return "grid-cols-2";
  if (n === 3) return "grid-cols-3";
  if (n === 4) return "grid-cols-2 md:grid-cols-4";
  return "grid-cols-2 md:grid-cols-5";
};

export const Features = () => {
  const config = useConfig();
  const specs = getSpecs(config);

  if (!specs.length) return null;

  return (
    <section className="bg-surface border-t border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className={`grid ${colsForCount(specs.length)}`}>
          {specs.map((spec, i) => (
            <div key={i} className="py-6 md:py-8 md:text-center px-4 md:px-0 border-b md:border-b-0 border-r border-gray-200 last:border-r-0">
              <p className="text-xs tracking-widest uppercase mb-1 text-ink/60">{spec.label}</p>
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-ink font-display">
                {spec.value}
                {spec.unit && <span className="text-base ml-1 font-normal text-ink/60">{spec.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
