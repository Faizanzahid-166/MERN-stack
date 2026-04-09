// src/index.js
import "./config/dotenv.js"; // load .env first

import connectDB from "./database/mongodb/dbconnect.js";
import { server } from "./server.js";

connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
