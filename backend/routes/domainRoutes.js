import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDomain,
  listDomains,
  getDomainBySlug,
  updateDomain,
  deleteDomain,
  listDomainsWithCategories,
} from "../controllers/domainController.js";

const router = express.Router();

// PUBLIC
router.get("/", listDomains);
router.get("/with-categories", listDomainsWithCategories); // static route first
router.get("/:slug", getDomainBySlug); // dynamic route last



// ADMIN
router.post("/", protect, createDomain);
router.put("/:id", protect, updateDomain);
router.delete("/:id", protect, deleteDomain);



export default router;
