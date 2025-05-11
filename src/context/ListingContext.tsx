import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Listing as ListingModel } from '../models/Listing';
import type { Listing } from '../types';

interface ListingContextType {
  listings: Listing[];
  filteredListings: Listing[];
  featuredListings: Listing[];
  searchTerm: string;
  selectedCategory: string | null;
  selectedLocation: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedLocation: (location: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  filterListings: () => void;
  addListing: (listing: Omit<Listing, 'id' | 'date'>) => Promise<void>;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const useListings = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error('useListings must be used within a ListingProvider');
  }
  return context;
};

interface ListingProviderProps {
  children: ReactNode;
}

export const ListingProvider = ({ children }: ListingProviderProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fetchedListings = await ListingModel.find().populate('seller');
        const formattedListings = fetchedListings.map(listing => ({
          id: listing._id.toString(),
          title: listing.title,
          description: listing.description,
          price: listing.price,
          category: listing.category,
          location: listing.location,
          imageUrl: listing.imageUrl,
          date: listing.createdAt.toISOString().split('T')[0],
          seller: {
            id: listing.seller._id.toString(),
            name: listing.seller.name,
            rating: listing.seller.rating
          },
          featured: listing.featured
        }));
        setListings(formattedListings);
        setFilteredListings(formattedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const featuredListings = listings.filter(listing => listing.featured);

  const filterListings = () => {
    let filtered = [...listings];

    if (searchTerm) {
      filtered = filtered.filter(
        listing => 
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered.filter(listing => listing.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    if (minPrice !== null) {
      filtered = filtered.filter(listing => listing.price >= minPrice);
    }

    if (maxPrice !== null) {
      filtered = filtered.filter(listing => listing.price <= maxPrice);
    }

    setFilteredListings(filtered);
  };

  const setPriceRange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const addListing = async (listing: Omit<Listing, 'id' | 'date'>) => {
    try {
      const newListing = await ListingModel.create({
        ...listing,
        seller: listing.seller.id
      });
      
      const populatedListing = await newListing.populate('seller');
      
      const formattedListing: Listing = {
        id: populatedListing._id.toString(),
        title: populatedListing.title,
        description: populatedListing.description,
        price: populatedListing.price,
        category: populatedListing.category,
        location: populatedListing.location,
        imageUrl: populatedListing.imageUrl,
        date: populatedListing.createdAt.toISOString().split('T')[0],
        seller: {
          id: populatedListing.seller._id.toString(),
          name: populatedListing.seller.name,
          rating: populatedListing.seller.rating
        },
        featured: populatedListing.featured
      };
      
      setListings(prev => [formattedListing, ...prev]);
      filterListings();
    } catch (error) {
      console.error('Error adding listing:', error);
      throw error;
    }
  };

  useEffect(() => {
    filterListings();
  }, [searchTerm, selectedCategory, selectedLocation, minPrice, maxPrice, listings]);

  const value = {
    listings,
    filteredListings,
    featuredListings,
    searchTerm,
    selectedCategory,
    selectedLocation,
    minPrice,
    maxPrice,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLocation,
    setPriceRange,
    filterListings,
    addListing
  };

  return (
    <ListingContext.Provider value={value}>
      {children}
    </ListingContext.Provider>
  );
};