import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User with the same email already exists"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) next(errorHandler(401, "Invalid credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expirationDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
