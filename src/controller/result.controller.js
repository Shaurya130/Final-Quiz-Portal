import Result from "../models/Results.js";

 const saveResult = async (req, res) => {
  try {
    const { name , email, score, codingScore, aptScore, webScore, mathsScore } = req.body;

   if (
      !name ||
      !email ||
      score === undefined ||
      codingScore === undefined ||
      aptScore === undefined ||
      webScore === undefined ||
      mathsScore === undefined
    ) {
      return res.status(400).json({
        message: "Email, score, and all subject scores are required"
      });
    }

    const newResult = new Result({ name,email, score, codingScore, aptScore, webScore, mathsScore });
    await newResult.save();

    res
      .status(201)
      .json({ message: "Result saved successfully", data: newResult });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving result", error: error.message });
  }
};

 const getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching results", error: error.message });
  }
};

export {getResults, saveResult}