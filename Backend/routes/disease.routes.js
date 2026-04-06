import express from "express";
import { saveDisease, getDisease, predictDisease, smartPredict} from "../controller/disease.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", saveDisease);
router.get("/", getDisease);
router.post("/predict",auth, predictDisease);
router.post("/smart-predict",auth, smartPredict);

export default router;