import React, { useState } from 'react';
import { X, ImagePlus } from 'lucide-react';
import { Listing } from '../../types';
import { categories } from '../../data/categories';
import { locations } from '../../data/locations';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

interface ListingFormProps {
  onSubmit: (listing: Omit<Listing, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit, onCancel }) => {
  const { currentUser } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price) newErrors.price = 'Price is required';
    if (Number(price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!category) newErrors.category = 'Category is required';
    if (!location) newErrors.location = 'Location is required';
    if (!imageUrl) newErrors.imageUrl = 'Image URL is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      title,
      description,
      price: Number(price),
      category,
      location,
      imageUrl,
      seller: {
        id: currentUser?.id || 'guest',
        name: currentUser?.name || 'Guest User',
        rating: currentUser?.rating || 5
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Listing</h2>
          <button
            onClick={onCancel}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="What are you selling?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              fullWidth
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe your item in detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500`}
                required
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            
            <Input
              label="Price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
              fullWidth
              required
            />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Category"
                options={[
                  { value: '', label: 'Select a category' },
                  ...categories.map(cat => ({ value: cat.id, label: cat.name }))
                ]}
                value={category}
                onChange={setCategory}
                error={errors.category}
                fullWidth
                required
              />
              
              <Select
                label="Location"
                options={[
                  { value: '', label: 'Select a location' },
                  ...locations.map(loc => ({ value: loc.name, label: loc.name }))
                ]}
                value={location}
                onChange={setLocation}
                error={errors.location}
                fullWidth
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="aspect-square h-28 overflow-hidden rounded-lg border border-gray-300">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Listing preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                      <ImagePlus size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={errors.imageUrl}
                    fullWidth
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    For this demo, please use direct image URLs
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Post Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingForm;