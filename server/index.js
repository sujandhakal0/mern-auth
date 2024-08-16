// index.js
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import userRouter from "./routes/user.route.js";
import Authrouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dotenv.config({ path: "./config/config.env" });
await connectToDatabase();

app.use("/api/user", userRouter);
app.use("/api/auth", Authrouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
