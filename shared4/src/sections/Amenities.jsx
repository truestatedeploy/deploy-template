import { useState } from "react";
import {
  Swimming, Gym, Yoga, Stretching, Table, Arcade, Group, Building, Puzzle,
  TennisBallAlt, Desk, TennisBall, Trophy, Running, Check,
} from "iconoir-react";
import { useConfig } from "../ConfigContext";

const ALL_AMENITIES = {
  "Swimming Pool": Swimming,
  "Gymnasium": Gym,
  "Yoga Pavilion": Yoga,
  "Spa & Wellness": Stretching,
  "Wellness Centre": Stretching,
  "Table Tennis": Table,
  "Indoor Games Room": Arcade,
  "Senior Citizen Zone": Group,
  "Clubhouse": Building,
  "Party Hall": Building,
  "Children's Play Area": Puzzle,
  "Creche & Daycare": Puzzle,
  "Squash Court": TennisBallAlt,
  "Co-working Lounge": Desk,
  "Badminton Courts": TennisBall,
  "Cricket Practice Nets": Trophy,
  "Jogging Track": Running,
};

// Buckets a flat amenity name into one of the Figma source's four categories —
// keeps the CMS schema a simple flat list while restoring the original
// tabbed-category interaction client-side.
const CATEGORY_MAP = {
  "swimming pool": "Wellness",
  "yoga pavilion": "Wellness",
  "spa & wellness": "Wellness",
  "wellness centre": "Wellness",
  "meditation garden": "Wellness",

  "gymnasium": "Sports",
  "squash court": "Sports",
  "badminton courts": "Sports",
  "cricket practice nets": "Sports",
  "jogging track": "Sports",
  "table tennis": "Sports",

  "children's play area": "Family",
  "indoor games room": "Family",
  "senior citizen zone": "Family",
  "creche & daycare": "Family",

  "co-working lounge": "Lifestyle",
  "clubhouse": "Lifestyle",
  "party hall": "Lifestyle",
};

const CATEGORY_ORDER = ["Wellness", "Sports", "Family", "Lifestyle"];

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9&'\s]/g, "").trim();
const NORMALIZED_ICONS = Object.fromEntries(Object.entries(ALL_AMENITIES).map(([name, Icon]) => [normalize(name), Icon]));
const resolveIcon = (name) => NORMALIZED_ICONS[normalize(name)] || null;
const resolveCategory = (name) => CATEGORY_MAP[normalize(name)] || "Lifestyle";

const DEFAULT_AMENITIES = Object.keys(ALL_AMENITIES).slice(0, 12);

export const Amenities = () => {
  const config = useConfig();
  const names = config.amenities?.length > 0 ? config.amenities : DEFAULT_AMENITIES;

  const categories = CATEGORY_ORDER
    .map((label) => ({
      label,
      items: names.filter((n) => resolveCategory(n) === label).map((n) => ({ name: n, Icon: resolveIcon(n) || Check })),
    }))
    .filter((c) => c.items.length > 0);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.label);
  const [displayCategory, setDisplayCategory] = useState(categories[0]?.label);
  const [transitioning, setTransitioning] = useState(false);

  if (!categories.length) return null;

  const switchCategory = (label) => {
    if (label === activeCategory) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayCategory(label);
      setActiveCategory(label);
      setTransitioning(false);
    }, 180);
  };

  const category = categories.find((c) => c.label === displayCategory) || categories[0];

  return (
    <section id="amenities" className="py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2 text-ink/60">Amenities</p>
          <h2 className="text-4xl md:text-5xl text-ink font-display">
            {config.amenities_heading || "Everyday Life, Elevated"}
          </h2>
        </div>

        {categories.length > 1 && (
          <div className="scroll-x-hidden mb-8">
            <div className="flex gap-2 min-w-max md:min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => switchCategory(cat.label)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                    activeCategory === cat.label
                      ? "bg-secondary text-primary border-primary"
                      : "bg-transparent text-ink/60 border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="transition-opacity duration-200" style={{ opacity: transitioning ? 0 : 1 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {category.items.map(({ name, Icon }) => (
              <div key={name} className="rounded-xl px-4 py-5 flex items-center gap-3 bg-surfaceSoft border border-gray-200">
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-secondary">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-medium text-ink">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
