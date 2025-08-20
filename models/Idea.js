import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
    },
    summary: {
      type: String,
      required: true,
      trime: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;
