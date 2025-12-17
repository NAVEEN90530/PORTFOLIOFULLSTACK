import Project from "../models/Project.js";
import Category from "../models/Category.js";
import Domain from "../models/Domain.js";

/* =========================================================
   CREATE PROJECT (ADMIN)
========================================================= */
export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      domain,
      category,
      imageUrl,
      taglines,
      badge,
    } = req.body;

    // Validation
    if (!name || !description || !domain || !category || !imageUrl || !taglines) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check domain exists
    const domainExists = await Domain.findById(domain);
    if (!domainExists) {
      return res.status(400).json({ message: "Invalid domain" });
    }

    // Check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const project = await Project.create({
      name,
      description,
      domain,
      category,
      imageUrl,
      taglines,
      badge: badge ?? false,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   GET ALL PROJECTS (PUBLIC)
========================================================= */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("domain", "name slug")
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   GET SINGLE PROJECT BY ID (PUBLIC)
========================================================= */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("domain", "name slug")
      .populate("category", "name slug");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   UPDATE PROJECT (ADMIN)
========================================================= */
export const updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Prevent accidental overwrite
    if (updateData.badge === undefined) delete updateData.badge;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("domain", "name slug")
      .populate("category", "name slug");

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updated,
    });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   DELETE PROJECT (ADMIN)
========================================================= */
export const deleteProject = async (req, res) => {
  try {
    const removed = await Project.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =========================================================
   LIST PROJECT (PUBLIC)
========================================================= */

export const listProjects = async (req, res) => {
  try {
    const { domain, category } = req.query;
    const filter = {};

    // DOMAIN FILTER (optional)
    if (domain) {
      const domainDoc = await Domain.findOne({ slug: domain });
      if (!domainDoc) {
        return res.status(404).json({ message: "Domain not found" });
      }
      filter.domain = domainDoc._id;
    }

    // CATEGORY FILTER (independent)
    if (category) {
      const categoryQuery = { slug: category };

      // Only restrict category to domain if domain is provided
      if (filter.domain) {
        categoryQuery.domain = filter.domain;
      }

      const categoryDoc = await Category.findOne(categoryQuery);
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }

      filter.category = categoryDoc._id;
    }

    const projects = await Project.find(filter)
      .populate("domain", "name slug")
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
