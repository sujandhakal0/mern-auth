// ./config/database.js
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "codepen",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Database connection error: ", err);
    });
};
