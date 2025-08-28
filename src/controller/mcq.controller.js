import { asyncHandler } from "../utils/asyncHandler.js"
import Mcq from "../models/Mcq.js";

const getQuestions = asyncHandler(async (req, res) => {
  try {
    const mcqs = await Mcq.find();
    res.json(mcqs);
  } catch (err) {
    console.error("Error fetching MCQs:", err); 
    res.status(500).json({ error: err.message });
  }
});

export { getQuestions };
