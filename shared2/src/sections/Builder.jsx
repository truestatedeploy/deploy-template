import React from 'react';
import { useConfig } from '../ConfigContext';

export const Builder = () => {
  const config = useConfig();
  
  if (!config.builder) return null;

  return (
    <section id="Builder" className="bg-white py-16 md:py-24 px-5 md:px-[7.5rem] border-t border-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        <div className="flex-shrink-0">
          {config.builder_logo_url ? (
            <img 
              src={config.builder_logo_url} 
              alt={config.builder} 
              className="w-40 h-40 md:w-48 md:h-48 object-contain bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-100"
            />
          ) : (
            <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-magenta/10 rounded-2xl border border-magenta/20 shadow-sm text-4xl font-display font-semibold text-magenta">
              {config.builder_logo_text || config.builder.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex flex-col text-center md:text-left">
          <p className="font-detail text-sm font-semibold uppercase tracking-[0.25em] text-magenta mb-3">
            About the Builder
          </p>
          <h2 className="font-display font-medium text-3xl md:text-4xl text-gray-900 mb-5">
            {config.builder}
          </h2>
          <p className="font-body text-base md:text-lg text-gray-600 leading-relaxed">
            Delivering excellence in real estate with a commitment to quality, 
            innovation, and customer satisfaction. {config.builder} has a proven track 
            record of developing premium residential spaces that redefine modern living.
          </p>
        </div>

      </div>
    </section>
  );
};
