import express from "express";
import { addUserSymptoms } from "../controller/userSymptoms.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addUserSymptoms);

export default router;