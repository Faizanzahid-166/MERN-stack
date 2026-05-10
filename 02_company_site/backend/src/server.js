import './config/dotenv.js';
import express from "express";
import cors from'cors';
import {connectDB} from './database/db.js';
import errorHandler from './middleware/errorHandler.js';

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

app.get("/test-db", async (req, res) => {
  const Test = mongoose.model("Test", new mongoose.Schema({ name: String }));

  await Test.create({ name: "Hello MongoDB" });

  res.send("DB created + data inserted");
});

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
connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
   app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
