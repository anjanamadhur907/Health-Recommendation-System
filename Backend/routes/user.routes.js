import express from "express";
import { save, login, fetchAll, getById } from "../controller/user.controller.js";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("age").notEmpty(),
  save
);

router.post("/login", login);

router.get("/", auth, fetchAll);
router.get("/:id", auth, getById);

export default router;