import express from "express";
import Idea from "../models/Idea.js";
import mongoose from "mongoose";

const router = express.Router();

// @route         GET /api/ideas
// @description   Get all ideas
// @access        Public

router.get("/", async (req, res, next) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    console.log(err);

    next(err);
  }
});

// @route         GET /api/ideas/:id
// @description   Get a single idea
// @access        Public

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Idea Not Found");
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      res.status(404);
      throw new Error("Idea Not Found");
    }
    res.json(idea);
  } catch (err) {
    console.log(err);

    next(err);
  }
});

router.post("/", (req, res) => {
  const { title, description } = req.body;
  console.log(description);
  res.send(title);
});

export default router;
