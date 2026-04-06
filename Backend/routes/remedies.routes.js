import express from "express";
import { addRemedies, getRemedies, getRemedyByDisease } from "../controller/remedies.controller.js";

const router = express.Router();

router.post("/",addRemedies);

router.get("/",getRemedies);

router.get("/:disease_id",getRemedyByDisease);

export default router;