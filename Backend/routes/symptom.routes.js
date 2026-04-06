import express from "express";
import { saveSymptom, fetchSymptom } from "../controller/sympotm.controller.js";

const router = express.Router();

router.post("/", saveSymptom);
router.get("/", fetchSymptom);

export default router;