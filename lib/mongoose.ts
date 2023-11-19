import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("No mongodb URL available");
  }
  if (isConnected) {
    return console.log("MongoDb already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "stackoverflow",
    });
    isConnected = true;
    console.log("connected to db");
  } catch (error) {
    console.log(error, "while connecting to db");
  }
};
