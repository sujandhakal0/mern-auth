// index.js
import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import userRouter from "./routes/user.route.js";
import Authrouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

dotenv.config({ path: "./config/config.env" });
await connectToDatabase();

app.use(
  cors({
    origin: "https://vercel.com/moonergone0s-projects/mern-auth/XgAAiMGyXyXE459AhLGWGEpiH5wm",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    // This line enables credentials
  })
);

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
