import React from 'react';
import { Listing } from '../../types';
import ListingCard from './ListingCard';

interface ListingGridProps {
  listings: Listing[];
  onViewListing: (listing: Listing) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

const ListingGrid: React.FC<ListingGridProps> = ({ 
  listings, 
  onViewListing,
  isLoading = false,
  emptyMessage = 'No listings found'
}) => {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
        <p className="text-lg font-medium text-gray-600">{emptyMessage}</p>
        <p className="text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard 
          key={listing.id}
          listing={listing}
          onClick={onViewListing}
        />
      ))}
    </div>
  );
};

export default ListingGrid;