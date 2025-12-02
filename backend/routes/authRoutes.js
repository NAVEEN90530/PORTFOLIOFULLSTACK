import express from "express";
import {
  loginUser,
  logoutUser,
  getMe
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", logoutUser);

// CURRENT USER
router.get("/me", protect, getMe);

export default router;
