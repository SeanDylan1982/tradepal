import React, { useState } from 'react';
import { Sliders, Check } from 'lucide-react';
import { categories } from '../../data/categories';
import { locations } from '../../data/locations';
import Button from '../common/Button';

interface FiltersPanelProps {
  onFilterChange: (filters: {
    category: string | null;
    location: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  }) => void;
  selectedCategory: string | null;
  selectedLocation: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  onFilterChange,
  selectedCategory,
  selectedLocation,
  minPrice,
  maxPrice
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localCategory, setLocalCategory] = useState<string | null>(selectedCategory);
  const [localLocation, setLocalLocation] = useState<string | null>(selectedLocation);
  const [localMinPrice, setLocalMinPrice] = useState<string>(minPrice ? minPrice.toString() : '');
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(maxPrice ? maxPrice.toString() : '');

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      category: localCategory,
      location: localLocation,
      minPrice: localMinPrice ? parseInt(localMinPrice) : null,
      maxPrice: localMaxPrice ? parseInt(localMaxPrice) : null
    });
  };

  const handleClearFilters = () => {
    setLocalCategory(null);
    setLocalLocation(null);
    setLocalMinPrice('');
    setLocalMaxPrice('');
    
    onFilterChange({
      category: null,
      location: null,
      minPrice: null,
      maxPrice: null
    });
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white">
      <div 
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={toggleFilters}
      >
        <div className="flex items-center">
          <Sliders size={18} className="mr-2 text-gray-600" />
          <span className="font-medium text-gray-800">Filters</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          {(selectedCategory || selectedLocation || minPrice || maxPrice) && (
            <span className="mr-2 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-800">
              Filters active
            </span>
          )}
          <svg
            className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">Category</h3>
              <div className="space-y-2 overflow-y-auto max-h-40">
                <div
                  className={`flex cursor-pointer items-center rounded-md px-2 py-1.5 ${
                    localCategory === null ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setLocalCategory(null)}
                >
                  <Check 
                    size={16}
                    className={`mr-2 ${localCategory === null ? 'visible' : 'invisible'}`}
                  />
                  <span>All Categories</span>
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex cursor-pointer items-center rounded-md px-2 py-1.5 ${
                      localCategory === category.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setLocalCategory(category.id)}
                  >
                    <Check 
                      size={16}
                      className={`mr-2 ${localCategory === category.id ? 'visible' : 'invisible'}`}
                    />
                    <span>{category.name}</span>
                    <span className="ml-auto text-xs text-gray-500">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">Location</h3>
              <div className="space-y-2 overflow-y-auto max-h-40">
                <div
                  className={`flex cursor-pointer items-center rounded-md px-2 py-1.5 ${
                    localLocation === null ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setLocalLocation(null)}
                >
                  <Check 
                    size={16}
                    className={`mr-2 ${localLocation === null ? 'visible' : 'invisible'}`}
                  />
                  <span>All Locations</span>
                </div>
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`flex cursor-pointer items-center rounded-md px-2 py-1.5 ${
                      localLocation === location.name ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setLocalLocation(location.name)}
                  >
                    <Check 
                      size={16}
                      className={`mr-2 ${localLocation === location.name ? 'visible' : 'invisible'}`}
                    />
                    <span>{location.name}</span>
                    <span className="ml-auto text-xs text-gray-500">({location.count})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(e.target.value)}
                    />
                  </div>
                  <span className="text-gray-500">-</span>
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={handleClearFilters} size="sm">
              Clear Filters
            </Button>
            <Button variant="primary" onClick={handleApplyFilters} size="sm">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;