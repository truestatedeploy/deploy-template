import {
  Swimming, Gym, Yoga, Stretching, Table, Arcade, Group, Building, Puzzle,
  TennisBallAlt, Desk, TennisBall, Trophy, Running, Check,
} from "iconoir-react";
import { useConfig } from "../ConfigContext";

const ALL_AMENITIES = {
  "Swimming Pool": Swimming,
  "Gymnasium": Gym,
  "Yoga": Yoga,
  "Aerobics": Stretching,
  "Table Tennis": Table,
  "Pool Table": Arcade,
  "Senior's Corner": Group,
  "Clubhouse": Building,
  "Kid's Play Area": Puzzle,
  "Squash": TennisBallAlt,
  "Co-working Space": Desk,
  "Badminton Court": TennisBall,
  "Cricket": Trophy,
  "Jogging Track": Running,
};

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const NORMALIZED = Object.fromEntries(Object.entries(ALL_AMENITIES).map(([name, Icon]) => [normalize(name), Icon]));

const resolveIcon = (name) => NORMALIZED[normalize(name)] || null;

export const Amenities = () => {
  const config = useConfig();
  const list = (config.amenities?.length > 0 ? config.amenities : Object.keys(ALL_AMENITIES).slice(0, 8))
    .map((name) => ({ name, Icon: resolveIcon(name) || Check }));

  return (
    <section id="amenities" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Amenities</div>
          <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-ink">Curated amenities.</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map(({ name, Icon }) => (
            <div
              key={name}
              className="rounded-xl p-6 flex flex-col gap-4 bg-white border border-gray-200 hover:shadow-card-hover transition-shadow"
            >
              <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <span className="font-semibold text-sm text-ink">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
