import express from "express";
import {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial
} from "../controllers/testimonialController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getTestimonials);

// Admin Only
router.post("/", protect, createTestimonial);
router.put("/:id", protect, updateTestimonial);  // <-- Edit Route
router.delete("/:id", protect, deleteTestimonial);

export default router;
