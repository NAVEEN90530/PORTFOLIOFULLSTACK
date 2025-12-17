import Category from "../models/Category.js";
import Domain from "../models/Domain.js";
import slugify from "slugify";

/**
 * ============================
 * CREATE CATEGORY
 * ============================
 */
export const createCategory = async (req, res) => {
  try {
    const { name, domain, imageUrl, description } = req.body;

    if (!name || !domain || !imageUrl) {
      return res.status(400).json({ message: "All fields required" });
    }

    const domainExists = await Domain.findById(domain);
    if (!domainExists) {
      return res.status(400).json({ message: "Invalid domain" });
    }

    const slug = slugify(name.trim(), { lower: true, strict: true });

    // Check manually for existing category in the same domain
    const exists = await Category.findOne({ slug, domain });
    if (exists) {
      return res.status(400).json({
        message: "Category already exists in this domain",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      domain,
      imageUrl,
      description: description?.trim() || "",
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================
 * LIST CATEGORIES
 * Optional: filter by domain
 * ============================
 */
export const listCategories = async (req, res) => {
  try {
    const filter = req.query.domain ? { domain: req.query.domain } : {};

    const categories = await Category.find(filter)
      .populate("domain", "name slug")
      .sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================
 * GET SINGLE CATEGORY
 * ============================
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "domain",
      "name slug"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================
 * UPDATE CATEGORY
 * ============================
 */
export const updateCategory = async (req, res) => {
  try {
    const { name, imageUrl, domain, description } = req.body;

    const updateData = {};

    if (name) {
      updateData.name = name.trim();
      updateData.slug = slugify(name, { lower: true, strict: true });
    }
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (domain) updateData.domain = domain;
    if (description) updateData.description = description.trim();

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Category already exists in this domain",
      });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * ============================
 * DELETE CATEGORY
 * ============================
 */
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
