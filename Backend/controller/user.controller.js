import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

export const save = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    let { name, email, password, age } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password, age });

    return res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid password" });

    return res.status(200).json({
      message: "Login success",
      token: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const fetchAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user)
      return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};