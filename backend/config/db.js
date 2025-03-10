import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
  } catch (error) {
    process.exit(1); // 1 error, 0 success
  }
};
