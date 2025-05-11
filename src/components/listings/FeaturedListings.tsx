import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Listing } from '../../types';
import ListingCard from './ListingCard';

interface FeaturedListingsProps {
  listings: Listing[];
  onViewListing: (listing: Listing) => void;
  onViewAll: () => void;
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({ 
  listings, 
  onViewListing,
  onViewAll
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Featured Listings</h2>
          <button 
            onClick={onViewAll}
            className="flex items-center text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            View all <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard 
              key={listing.id}
              listing={listing}
              onClick={onViewListing}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;