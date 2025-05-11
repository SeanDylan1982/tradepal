import React from 'react';
import { MapPin, Calendar, User, MessageCircle, Phone, Share2, Heart, Flag } from 'lucide-react';
import { Listing } from '../../types';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

interface ListingDetailsProps {
  listing: Listing;
  onClose: () => void;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing, onClose }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  
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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      alert('Contact feature would connect you with the seller');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-gray-500 shadow-md hover:text-gray-700"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square">
            <img 
              src={listing.imageUrl} 
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex flex-col p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-start justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                <span className="text-2xl font-bold text-teal-600">{formatPrice(listing.price)}</span>
              </div>
              
              <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Posted on {formatDate(listing.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-medium text-gray-900">Description</h2>
              <p className="text-gray-700">{listing.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-medium text-gray-900">Seller Information</h2>
              <div className="flex items-center">
                <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                  <img 
                    src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg" 
                    alt={listing.seller.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{listing.seller.name}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(listing.seller.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">({listing.seller.rating})</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto grid grid-cols-2 gap-3">
              <Button 
                variant="primary" 
                onClick={handleContactSeller}
                className="flex items-center justify-center"
              >
                <MessageCircle size={16} className="mr-2" />
                Message
              </Button>
              <Button 
                variant="outline"
                onClick={handleContactSeller}
                className="flex items-center justify-center"
              >
                <Phone size={16} className="mr-2" />
                Call
              </Button>
            </div>
            
            <div className="mt-4 flex justify-between">
              <button className="flex items-center text-sm text-gray-600 hover:text-teal-600">
                <Heart size={16} className="mr-1" />
                Save
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-teal-600">
                <Share2 size={16} className="mr-1" />
                Share
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-red-600">
                <Flag size={16} className="mr-1" />
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;