import Project from "../models/Project.js";
import Category from "../models/Category.js";

// Create Project (Admin)
export const createProject = async (req, res) => {
  const { name, description, category, imageUrl, taglines, badge } = req.body;

  if (!name || !description || !category || !imageUrl || !taglines)
    return res.status(400).json({ message: "All fields required" });

  const categoryExists = await Category.findById(category);
  if (!categoryExists)
    return res.status(400).json({ message: "Invalid category" });

  const project = await Project.create({
    name,
    description,
    category,
    imageUrl,
    taglines,
    badge: badge ?? false  // 👈 default false if not sent
  });

  res.status(201).json({ message: "Project created", project });
};

// Get All Projects (Public)
export const getProjects = async (req, res) => {
  const projects = await Project.find().populate("category", "name");
  res.status(200).json(projects);
};

// Get Single Project (Public)
export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("category");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

// Update Project (Admin)
export const updateProject = async (req, res) => {
  const updateData = { ...req.body };

  // If badge is not sent → do not overwrite
  if (updateData.badge === undefined) {
    delete updateData.badge;
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true
  });

  if (!updated) return res.status(404).json({ message: "Project not found" });

  res.json({ message: "Project updated", project: updated });
};

// Delete Project (Admin)
export const deleteProject = async (req, res) => {
  const removed = await Project.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
};