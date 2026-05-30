// index.js — Express entry point (ES Modules)
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan  from 'morgan';

const app  = express();
export const PORT = process.env.PORT || 3000; // Match your reported logs


// ── Security & Parsing ────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : [];

app.use(cors({
   origin: function (origin, callback) {
  console.log("Request Origin:", origin);
  console.log("Allowed Origins:", allowedOrigins);

  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
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