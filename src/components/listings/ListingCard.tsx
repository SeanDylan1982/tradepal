import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Listing } from '../../types';
import Badge from '../common/Badge';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div 
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      onClick={() => onClick(listing)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={listing.imageUrl} 
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {listing.featured && (
          <div className="absolute left-2 top-2">
            <Badge variant="info">Featured</Badge>
          </div>
        )}
        <button className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-400 hover:text-red-500">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
            {listing.title}
          </h3>
          <span className="whitespace-nowrap text-lg font-bold text-teal-600">
            {formatPrice(listing.price)}
          </span>
        </div>
        
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>{listing.location}</span>
          </div>
          <span>{formatDate(listing.date)}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;