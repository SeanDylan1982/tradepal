import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);