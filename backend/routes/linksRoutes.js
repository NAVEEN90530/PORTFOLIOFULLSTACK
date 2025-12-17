import express from "express";
import { getLinks, updateLinks } from "../controllers/linksController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get social links
router.get("/", getLinks);

// Update social links (protected)
router.put("/", protect, updateLinks);

export default router;
