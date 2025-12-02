import Category from "../models/Category.js";
import slugify from "slugify";
import validator from "validator";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the name is provided and valid
    if (!name || typeof name !== "string" || validator.isEmpty(name.trim())) {
      return res.status(400).json({ message: "Name is required and should be a valid string" });
    }

    // Generate the slug from the category name
    const slug = slugify(name.trim(), { lower: true });

    // Check if the category already exists
    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: "Category with this name already exists" });
    }

    // Create the new category
    const category = new Category({ name: name.trim(), slug });
    await category.save();

    // Return the newly created category
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating category" });
  }
};

// List all categories
export const listCategories = async (req, res) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

// Update an existing category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate name
    if (!name || validator.isEmpty(name.trim())) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Generate the slug from the updated category name
    const slug = slugify(name.trim(), { lower: true });

    // Find and update the category
    const cat = await Category.findByIdAndUpdate(id, { name: name.trim(), slug }, { new: true });

    if (!cat) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Return the updated category
    res.json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating category" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete the category
    const cat = await Category.findByIdAndDelete(id);

    if (!cat) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Return success message
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting category" });
  }
};
