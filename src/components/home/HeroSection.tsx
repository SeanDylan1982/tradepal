import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { locations } from '../../data/locations';
import Button from '../common/Button';

interface HeroSectionProps {
  onSearch: (searchTerm: string, location: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, selectedLocation);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-teal-700 py-16 sm:py-24">
      <div className="absolute inset-0">
        <svg
          className="absolute left-0 top-0 h-full w-full text-white opacity-10"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 0,100" />
        </svg>
        <svg
          className="absolute right-0 bottom-0 h-full w-full rotate-180 text-white opacity-10"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 100,0 0,100" />
        </svg>
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Buy & Sell <span className="text-yellow-300">Anything</span> Near You
          </h1>
          <p className="mb-8 text-xl text-white opacity-90">
            Find the perfect deal from thousands of listings, or sell your items quickly and easily.
          </p>
          
          <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-2 shadow-lg sm:flex sm:p-0">
            <div className="relative flex-1 sm:flex">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:relative">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-lg border-none px-3 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:rounded-none sm:rounded-l-lg sm:pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative mt-2 flex-1 sm:mt-0 sm:flex">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="w-full appearance-none rounded-lg border-none bg-gray-50 px-3 py-3 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:rounded-none sm:border-l sm:border-gray-300"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name} ({location.count})
                  </option>
                ))}
              </select>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              className="mt-2 w-full bg-teal-600 py-3 hover:bg-teal-700 sm:mt-0 sm:w-auto sm:rounded-none sm:rounded-r-lg"
            >
              Search
            </Button>
          </form>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-white">Popular:</span>
            <button
              onClick={() => onSearch('car', '')}
              className="rounded-full bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
            >
              Cars
            </button>
            <button
              onClick={() => onSearch('iphone', '')}
              className="rounded-full bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
            >
              iPhones
            </button>
            <button
              onClick={() => onSearch('furniture', '')}
              className="rounded-full bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
            >
              Furniture
            </button>
            <button
              onClick={() => onSearch('bike', '')}
              className="rounded-full bg-white/20 px-3 py-1 text-sm text-white hover:bg-white/30"
            >
              Bikes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;