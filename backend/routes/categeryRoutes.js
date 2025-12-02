import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCategory, deleteCategory, listCategories, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

// PUBLIC
router.get("/", listCategories);


router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);
export default router;
