
import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
  domain: String,
  question: String,
  options: {
    A: String,
    B: String,
    C: String,
    D: String,
  },
  answer: String,
});

const Mcq = mongoose.model("Mcq", mcqSchema);

export default Mcq