import express from "express";

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// @route          POST api/auth/register
// @description    Register new User
// @access         Public

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400); // Bad request
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exist");
    }

    const user = await User.create({ name, email, password });

    // Create tokens
    const payload = { userId: user._id.toString() };
    const accessToken = await generateToken(payload, "1m");
    const refreshToken = await generateToken(payload, "30d");

    // Set refreshToken in HTTP-Only cookie:--
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // can't be accessed through client side JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route          POST api/auth/logout
// @description    Logout user and clear refresh token
// @access         Private

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(200).json({ message: "Loggged out successfully" });
});

export default router;
