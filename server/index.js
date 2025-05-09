import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import productRoutes from './routes/products.js';
import contactRoutes from './routes/contact.js';
import userRoutes from './routes/user.js';
import { errorHandler, notFound } from './middleware/error.js';

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.get("/", (req, res) => {
  res.send("Working");
});
// Database Connection
// Replace with your MongoDB connection string in production
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/elegant-store';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connection established'))
  .catch((error) => console.error('MongoDB connection failed:', error));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});