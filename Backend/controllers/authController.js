import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET);

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.json({ user, token: generateToken(user._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password)
    return res.status(400).json({ msg: "Invalid credentials" });

  res.json({ user, token: generateToken(user._id) });
};