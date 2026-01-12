// src/index.js
import "./config/dotenv.js"; // load .env first

import connectDB from "./database/connectDB.js";
import  server  from "./server.js";

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
