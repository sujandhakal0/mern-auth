// index.js
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config({ path: "./config/config.env" });
await connectToDatabase();

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
