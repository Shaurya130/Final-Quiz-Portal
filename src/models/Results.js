import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    mathsScore: {
      type: Number,
      required: true,
    },
    codingScore: {
      type: Number,
      required: true,
    },
    aptScore: {
      type: Number,
      required: true,
    },
    webScore: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;