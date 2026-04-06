import express from "express";
import {addUserSymptoms} from "../controller/userSymptoms.controller.js";

const router = express.Router();

router.post("/",addUserSymptoms);

export default router;