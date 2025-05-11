import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ListingProvider, useListings } from './context/ListingContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import CategorySection from './components/home/CategorySection';
import FeaturedListings from './components/listings/FeaturedListings';
import ListingGrid from './components/listings/ListingGrid';
import ListingDetails from './components/listings/ListingDetails';
import ListingForm from './components/listings/ListingForm';
import FiltersPanel from './components/listings/FiltersPanel';
import { Listing } from './types';

function AppContent() {
  const {
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
    addListing
  } = useListings();
  
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShowingAllListings, setIsShowingAllListings] = useState(false);

  const handleSearch = (term: string, location: string) => {
    setSearchTerm(term);
    if (location) {
      setSelectedLocation(location);
    }
    setIsShowingAllListings(true);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsShowingAllListings(true);
  };

  const handleFilterChange = (filters: {
    category: string | null;
    location: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  }) => {
    setSelectedCategory(filters.category);
    setSelectedLocation(filters.location);
    setPriceRange(filters.minPrice, filters.maxPrice);
  };

  const handleViewListing = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleCreateListing = (listing: Omit<Listing, 'id' | 'date'>) => {
    addListing(listing);
    setIsCreateModalOpen(false);
    setIsShowingAllListings(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar 
        onSearchChange={setSearchTerm} 
        onCreateListing={() => setIsCreateModalOpen(true)} 
      />
      
      {!isShowingAllListings ? (
        <>
          <HeroSection onSearch={handleSearch} />
          <CategorySection onSelectCategory={handleCategorySelect} />
          <FeaturedListings 
            listings={featuredListings} 
            onViewListing={handleViewListing}
            onViewAll={() => setIsShowingAllListings(true)}
          />
        </>
      ) : (
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="mb-8">
            <button 
              onClick={() => setIsShowingAllListings(false)}
              className="mb-4 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              ← Back to Home
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {selectedCategory ? 
                `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Listings` : 
                'All Listings'}
            </h1>
            
            {searchTerm && (
              <p className="mt-2 text-gray-600">
                Search results for "{searchTerm}"
                {selectedLocation && ` in ${selectedLocation}`}
              </p>
            )}
          </div>
          
          <FiltersPanel 
            onFilterChange={handleFilterChange}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
          
          <ListingGrid 
            listings={filteredListings} 
            onViewListing={handleViewListing}
            emptyMessage={searchTerm ? `No results found for "${searchTerm}"` : "No listings found"}
          />
        </main>
      )}
      
      <Footer />
      
      {selectedListing && (
        <ListingDetails 
          listing={selectedListing} 
          onClose={() => setSelectedListing(null)} 
        />
      )}
      
      {isCreateModalOpen && (
        <ListingForm 
          onSubmit={handleCreateListing}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ListingProvider>
        <AppContent />
      </ListingProvider>
    </AuthProvider>
  );
}

export default App;