import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (): Promise<void> => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables.");
        }
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully! 🚀");
    } catch (error:any) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDb;