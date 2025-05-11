import React, { useState } from 'react';
import { Menu, X, Search, User, PlusCircle } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

interface NavbarProps {
  onSearchChange: (term: string) => void;
  onCreateListing: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange, onCreateListing }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, currentUser, logout, openAuthModal, isModalOpen } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreateListing = () => {
    if (!isAuthenticated) {
      openAuthModal();
    } else {
      onCreateListing();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">TradePal</span>
            </a>
          </div>

          <div className="mx-4 hidden grow md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              className="hidden items-center gap-2 md:inline-flex"
              onClick={handleCreateListing}
            >
              <PlusCircle size={16} />
              <span>Post Ad</span>
            </Button>
            
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div className="flex items-center gap-3">
                  <span className="hidden text-sm font-medium text-gray-700 md:block">
                    {currentUser?.name}
                  </span>
                  <div className="flex rounded-full bg-gray-800 text-sm">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" onClick={openAuthModal} className="hidden md:inline-flex">
                <User size={16} className="mr-2" />
                Sign In
              </Button>
            )}

            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-4 px-2 pb-4 pt-2">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Search for anything..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleCreateListing}
                className="items-center justify-center gap-2"
              >
                <PlusCircle size={16} />
                <span>Post Ad</span>
              </Button>

              {!isAuthenticated && (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={openAuthModal}
                  className="items-center justify-center gap-2"
                >
                  <User size={16} />
                  <span>Sign In</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && <AuthModal />}
    </header>
  );
};

export default Navbar;