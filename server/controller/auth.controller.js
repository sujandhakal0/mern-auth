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
    if (!email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }
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
export const google = async (req, res, next) => {
  try {
    let validUser = await User.findOne({ email: req.body.email });
    if (validUser) {
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
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePhoto: req.body.photo,
      });
      validUser = await newUser.save();
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const { password: hashedPassword2, ...rest } = validUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expirationDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
