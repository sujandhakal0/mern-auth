// index.js
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import userRouter from "./routes/user.route.js";
import Authrouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({ path: "./config/config.env" });
await connectToDatabase();

// const allowedOrigins = ["https://mern-auth-ebon-sigma.vercel.app/"];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: "*",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

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
