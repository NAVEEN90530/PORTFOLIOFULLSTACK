import express from "express";
import { getLinks, updateLinks } from "../controllers/linksController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all links
router.get("/", getLinks);

// Update links
router.put("/links",protect, updateLinks);

export default router;
