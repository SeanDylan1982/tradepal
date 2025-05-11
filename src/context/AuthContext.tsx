import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User as UserModel } from '../models/User';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isModalOpen: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await UserModel.findOne({ email });
      
      if (user) {
        setCurrentUser({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          rating: user.rating
        });
        setIsAuthenticated(true);
        closeAuthModal();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const newUser = await UserModel.create({
        name,
        email,
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
        rating: 5.0
      });
      
      setCurrentUser({
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        rating: newUser.rating
      });
      setIsAuthenticated(true);
      closeAuthModal();
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const openAuthModal = () => {
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider 
      value={{
        currentUser,
        isAuthenticated,
        isModalOpen,
        login,
        logout,
        register,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};