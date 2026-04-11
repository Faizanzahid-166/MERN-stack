import './config/dotenv.js';
import express from "express";
import cors from'cors';
import {connectDB} from './database/db.js';
import errorHandler from './middleware/errorHandler.js';



// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
import contactRoutes from './routes/contactRoutes.js';
// import jobRoutes from './routes/jobRoutes.js';

// Use routes 
app.use('/api/contacts', contactRoutes);
// app.use('/api/jobs', jobRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blitz Tech Hub API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ Blitz Tech Hub API running on port ${PORT}`);
});
