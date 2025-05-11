import { Listing } from '../types';

export const listings: Listing[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Excellent Condition',
    description: 'Selling my iPhone 13 Pro, still in excellent condition. Comes with original box, charger, and a case. Battery health is at 92%.',
    price: 699,
    category: 'electronics',
    location: 'Sydney CBD',
    imageUrl: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
    date: '2025-04-15',
    seller: {
      id: 'user1',
      name: 'Alex Thompson',
      rating: 4.8
    },
    featured: true
  },
  {
    id: '2',
    title: 'Modern Sofa - Nearly New',
    description: 'Modern 3-seater sofa purchased 6 months ago. Very comfortable and in excellent condition. Moving house so need to sell.',
    price: 450,
    category: 'furniture',
    location: 'Melbourne Inner',
    imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
    date: '2025-04-14',
    seller: {
      id: 'user2',
      name: 'Sarah Wilson',
      rating: 4.6
    },
    featured: true
  },
  {
    id: '3',
    title: 'Professional Camera Kit - Canon EOS R5',
    description: 'Complete kit including Canon EOS R5, 3 lenses, tripod, and camera bag. Perfect for professional photography.',
    price: 3200,
    category: 'electronics',
    location: 'Brisbane North',
    imageUrl: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    date: '2025-04-13',
    seller: {
      id: 'user3',
      name: 'Michael Chen',
      rating: 4.9
    }
  },
  {
    id: '4',
    title: 'Mountain Bike - Trek Marlin 7',
    description: 'Trek Marlin 7 mountain bike, 2024 model. Lightly used and in great condition. 29" wheels, hydraulic disc brakes.',
    price: 850,
    category: 'sports',
    location: 'Perth Hills',
    imageUrl: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
    date: '2025-04-12',
    seller: {
      id: 'user4',
      name: 'Jessica Brown',
      rating: 4.7
    }
  },
  {
    id: '5',
    title: 'Macbook Pro 16" M2 - 32GB RAM',
    description: 'Macbook Pro 16" with M2 chip, 32GB RAM, 1TB SSD. Purchased 3 months ago, still under warranty.',
    price: 2700,
    category: 'electronics',
    location: 'Sydney North',
    imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    date: '2025-04-11',
    seller: {
      id: 'user5',
      name: 'David Kim',
      rating: 4.5
    },
    featured: true
  },
  {
    id: '6',
    title: 'Vintage Record Player',
    description: 'Beautiful vintage record player from the 1970s. Fully restored and in working condition. Comes with a collection of vinyl records.',
    price: 350,
    category: 'collectibles',
    location: 'Adelaide Central',
    imageUrl: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg',
    date: '2025-04-10',
    seller: {
      id: 'user6',
      name: 'Emma Watson',
      rating: 4.8
    }
  },
  {
    id: '7',
    title: 'IKEA Desk and Chair Set',
    description: 'IKEA desk and ergonomic chair. Perfect for home office setup. Only used for a few months.',
    price: 180,
    category: 'furniture',
    location: 'Melbourne East',
    imageUrl: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg',
    date: '2025-04-09',
    seller: {
      id: 'user7',
      name: 'Oliver Smith',
      rating: 4.6
    }
  },
  {
    id: '8',
    title: 'Nintendo Switch with Games',
    description: 'Nintendo Switch console with dock, controllers, and 5 popular games. All in excellent condition.',
    price: 320,
    category: 'electronics',
    location: 'Brisbane South',
    imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg',
    date: '2025-04-08',
    seller: {
      id: 'user8',
      name: 'Sophia Martinez',
      rating: 4.7
    }
  }
];