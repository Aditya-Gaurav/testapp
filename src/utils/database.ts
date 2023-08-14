import mongoose from 'mongoose';

const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retireE';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};
