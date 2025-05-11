import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://sean:mRIcELC6mgukyBpb@cluster0.c1zcupk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB Disconnection Error:', error);
    throw error;
  }
}