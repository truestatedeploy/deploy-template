import {
  Swimming,
  Gym,
  Yoga,
  Stretching,
  Table,
  Arcade,
  Group,
  Building,
  Puzzle,
  TennisBallAlt,
  Desk,
  TennisBall,
  Trophy,
  Running,
  Check,
} from 'iconoir-react';
import { useConfig } from '../ConfigContext';

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

// Campaign copy rarely matches ALL_AMENITIES' exact wording ("Swimming Pool" vs
// "Swimming pool", "Children's Play Area" vs "Kid's Play Area"). Resolve by
// normalised text first, then a couple of known synonyms, so icons still show
// up without requiring campaigns to match the dictionary verbatim.
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const NORMALIZED_AMENITIES = Object.fromEntries(
  Object.entries(ALL_AMENITIES).map(([name, Icon]) => [normalize(name), Icon])
);
const AMENITY_SYNONYMS = {
  childrensplayarea: 'kidsplayarea',
  kidsplayarea: 'kidsplayarea',
  playarea: 'kidsplayarea',
  indoorgamesroom: 'tabletennis',
};

const resolveAmenityIcon = (name) => {
  const key = normalize(name);
  return NORMALIZED_AMENITIES[key] || NORMALIZED_AMENITIES[AMENITY_SYNONYMS[key]] || null;
};

// Main Component for displaying the Amenities Section
export const Amenities = () => {
  const config = useConfig();
  // Every configured amenity renders — even ones with no matching icon asset
  // (e.g. "Multipurpose Hall", "24/7 Security") fall back to a generic glyph
  // instead of silently disappearing from the section.
  const amenitiesData = (config.amenities?.length > 0 ? config.amenities : Object.keys(ALL_AMENITIES))
    .map((name) => ({ name, Icon: resolveAmenityIcon(name) || Check }));

  return (
    <div id="Amenities" className="w-full bg-white">
      <div className="flex flex-col justify-center w-full">
        <div className='w-full py-14 md:py-24 px-5 md:px-[7.5rem] flex justify-center'>

          {/* Section Header */}
          <div className="w-full mx-auto flex flex-col gap-10 md:gap-14">
            <div className='text-center md:text-left text-4xl md:text-5xl font-subheading font-semibold w-full text-gray-900 tracking-tight'>
              Amenities
            </div>

            {/* Amenities Grid */}
            <div className="w-full mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

                {/* Looping through the amenitiesData to dynamically create amenity items */}
                {amenitiesData.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="group flex flex-col gap-5 rounded-xl p-6 md:p-7 min-h-[150px] md:min-h-[170px] bg-white border border-gray-200 transition-all duration-300 hover:border-magenta hover:shadow-lg hover:-translate-y-1.5"
                  >
                    {/* Amenity Icon (top) */}
                    <Icon
                      className="h-9 w-9 md:h-10 md:w-10 text-magenta transition-transform duration-300 group-hover:scale-105"
                      strokeWidth={1.5}
                    />

                    {/* Amenity Name */}
                    <h3 className="font-body text-base md:text-lg font-semibold leading-snug text-gray-800">
                      {name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
