import mongoose from "mongoose";
import { log } from "node:console";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1); //process code 1 code means exit with failure, 0 means success
  }
};
