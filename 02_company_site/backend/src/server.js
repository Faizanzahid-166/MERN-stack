import './config/dotenv.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './database/db.js';
import errorHandler from './middleware/errorHandler.js';
import { initializeAgent } from './services/elevenlabsService.js';

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://blitz-tech-hub-v2.vercel.app',
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import contactRoutes from './routes/contactRoutes.js';
import elevenlabsRoutes from './routes/ElevemlabRouter.js';

app.get('/02_blitz_site', async (req, res) => {
  const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
  await Test.create({ name: 'Hello MongoDB' });
  res.send('DB created + data inserted');
});

app.use('/api/contacts', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blitz Tech Hub API is running' });
});

app.use('/api/agent', elevenlabsRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

connectDB().then(async () => {
  const PORT = process.env.PORT || 4000;

  await initializeAgent();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to boot Blitz Tech Hub backend:', error);
  process.exit(1);
});
