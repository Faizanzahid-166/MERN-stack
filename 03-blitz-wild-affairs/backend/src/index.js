// index.js — Express entry point (ES Modules)
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan  from 'morgan';

const app  = express();
export const PORT = process.env.PORT || 3000; // Match your reported logs

// ── Security & Parsing ────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'http://127.0.0.1:5173', // local dev alternative
  'http://localhost:3000',
];

app.use(cors({
    origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or matching origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '50mb' })); // Increased for potential avatar base64
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

export {app}