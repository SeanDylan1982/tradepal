export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  imageUrl: string;
  date: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export type LocationType = {
  id: string;
  name: string;
  count: number;
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
}