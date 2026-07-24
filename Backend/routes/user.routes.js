import express from "express";
import { save, login, fetchAll, getById } from "../controller/user.controller.js";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Please enter a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("age").notEmpty().withMessage("Age is required"),
  save
);

router.post("/login", login);

router.get("/", auth, fetchAll);
router.get("/:id", auth, getById);

export default router;