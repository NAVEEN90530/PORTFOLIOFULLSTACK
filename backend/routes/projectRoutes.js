import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  listProjects,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getProjects); // Get all projects (no filter)
router.get("/list", listProjects); // Get projects with filters (domain, category, etc.)
router.get("/:id", getProjectById); // Get project by ID

// Admin Only Routes
router.post("/", protect, createProject); // Admin create project
router.put("/:id", protect, updateProject); // Admin update project
router.delete("/:id", protect, deleteProject); // Admin delete project

export default router;
