import meditate from '../assets/amenities/yoga.png';
import pool from '../assets/amenities/swimming.png';
import gym from '../assets/amenities/gym.png';
import aerobics from '../assets/amenities/aerobics.png';
import tableTennis from '../assets/amenities/table.png';
import poolTable from '../assets/amenities/billiards.png';
import senior from '../assets/amenities/senior.png';
import clubhouse from '../assets/amenities/club.png';
import kids from '../assets/amenities/kids.png';
import squash from '../assets/amenities/squash.png';
import cowork from '../assets/amenities/cowork.png';
import badminton from '../assets/amenities/badminton.png';
import cricket from '../assets/amenities/cricket.jpg';
import { useConfig } from '../ConfigContext';

const ALL_AMENITIES = {
  "Swimming pool": pool,
  "Gymnasium": gym,
  "Yoga": meditate,
  "Aerobics": aerobics,
  "Table Tennis": tableTennis,
  "Pool Table": poolTable,
  "Senior's Corner": senior,
  "Clubhouse": clubhouse,
  "Kid's play area": kids,
  "Squash": squash,
  "Co-working space": cowork,
  "Badminton Court": badminton,
  "Cricket": cricket,
};

// Main Component for displaying the Amenities Section
export const Amenities = () => {
  const config = useConfig();
  const amenitiesData = (config.amenities?.length > 0 ? config.amenities : Object.keys(ALL_AMENITIES))
    .reduce((acc, name) => {
      if (ALL_AMENITIES[name]) acc[name] = ALL_AMENITIES[name];
      return acc;
    }, {});

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
                {Object.entries(amenitiesData).map(([amenity, Icon]) => (
                  <div
                    key={amenity}
                    className="group relative flex flex-col justify-between rounded-xl p-5 md:p-6 min-h-[150px] md:min-h-[180px] bg-white border border-gray-200 transition-all duration-300 hover:border-magenta/40 hover:shadow-card"
                  >
                    {/* Amenity Icon (top) */}
                    <div className="flex items-center justify-center h-11 w-11 rounded-full bg-magenta/90 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={Icon}
                        alt={amenity}
                        loading="lazy"
                        decoding="async"
                        className="h-6 object-contain brightness-0 invert"
                      />
                    </div>

                    {/* Amenity Name */}
                    <h3 className="font-body text-base md:text-lg font-semibold leading-snug text-gray-800 mt-6">
                      {amenity}
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
