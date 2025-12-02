import express from "express";
import { getSettings, updateContact, updateStats } from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getSettings);

// ADMIN
router.put("/contact", protect, updateContact);
router.put("/stats", protect, updateStats);
export default router;
