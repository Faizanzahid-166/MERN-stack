// config/db.js
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
//import { createRootAdmin } from "./createRootAdmin.js"; // ✅ include .js

export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_DB_URL;
    
    if (!mongoUrl) {
      throw new Error("MONGO_DB_URL is not defined in your .env file");
    }

    const connectionInstance = await mongoose.connect(
      `${mongoUrl}/${DB_NAME}`
    );
    console.log(DB_NAME); // ✅ log the connection instance
    console.log(`✅ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    // Call root admin creator
    // await createRootAdmin();

  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
