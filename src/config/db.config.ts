import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB ERR:", error);
    process.exit(1);
  }
};

export default connectDB;
