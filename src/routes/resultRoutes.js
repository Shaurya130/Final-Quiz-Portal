import express from "express";
import { saveResult, getResults } from "../controller/result.controller.js"

const router = express.Router();

router.post("/results", saveResult); 
router.get("/results", getResults); 

export default router;