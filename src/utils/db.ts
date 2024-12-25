import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Db conection successful");
  } catch (error) {
    console.error("Db connection error", (error as Error).message);
  }
};
export default connectDB;
