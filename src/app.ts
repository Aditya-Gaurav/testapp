import express from 'express';
import { errorHandler } from './utils/errorHandler'; // Import the errorHandler
import { connectDatabase } from './utils/database';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import categoryRoutes from './routes/categoryRoutes';



import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/category', categoryRoutes);


// Centralized error handler middleware
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Connect to the database
connectDatabase();
