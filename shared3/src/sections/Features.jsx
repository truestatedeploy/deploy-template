import { useConfig } from "../ConfigContext";

const getSpecs = (config) => {
  if (Array.isArray(config.specs) && config.specs.length > 0) return config.specs;
  const features = config.features?.length > 0 ? config.features : [
    { title: "Open Space", value: "68%" },
    { title: "Acres", value: "7.9" },
    { title: "Clubhouse Sq.Ft.", value: "40K" },
    { title: "BHK Configs", value: "3 & 4" },
    { title: "Total Units", value: "312" },
    { title: "RERA Status", value: "Registered" },
  ];
  return features.map((f) => ({ value: f.value, unit: "", label: f.title }));
};

// Size the grid to however many specs actually exist — a fixed column count
// leaves empty trailing cells (and an awkward gap) whenever a campaign has
// fewer specs than the largest demo count.
const colsForCount = (n) => {
  if (n <= 2) return "grid-cols-2";
  if (n === 3) return "grid-cols-3";
  if (n === 4) return "grid-cols-2 sm:grid-cols-4";
  if (n === 5) return "grid-cols-2 sm:grid-cols-5";
  return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
};

export const Features = () => {
  const config = useConfig();
  const specs = getSpecs(config);

  return (
    <section id="investment" className="bg-white border-y border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className={`grid ${colsForCount(specs.length)} border-l border-gray-200`}>
          {specs.map((s, i) => (
            <div
              key={i}
              className="px-6 py-10 text-center border-r border-gray-200 hover:bg-surface transition-colors"
            >
              <div className="text-[32px] font-semibold leading-none mb-2 text-primary">
                {s.value}{s.unit ? ` ${s.unit}` : ""}
              </div>
              <div className="text-sm font-semibold text-ink">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
