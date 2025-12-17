import Domain from "../models/Domain.js";
import Category from "../models/Category.js";
import slugify from "slugify";

/* ============================
   CREATE DOMAIN
============================ */
export const createDomain = async (req, res) => {
  try {
    const { name, imageUrl, description, whyChoose } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ message: "Name & image required" });
    }

    const slug = slugify(name.trim(), { lower: true });

    const exists = await Domain.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: "Domain already exists" });
    }

    const domain = await Domain.create({
      name: name.trim(),
      slug,
      imageUrl,
      description: description?.trim() || "",
      whyChoose: Array.isArray(whyChoose) ? whyChoose : [],
    });

    res.status(201).json(domain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   LIST ALL DOMAINS
============================ */
export const listDomains = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ name: 1 });
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   LIST DOMAINS WITH CATEGORIES
============================ */

export const listDomainsWithCategories = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ name: 1 }).lean();

    const domainsWithCategories = await Promise.all(
      domains.map(async (domain) => {
        const categories = await Category.find({ domain: domain._id })
          .select("name slug imageUrl description domain")
          .populate("domain", "name slug") // include domain name & slug
          .lean();
        return { ...domain, categories };
      })
    );

    res.json(domainsWithCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ============================
   GET DOMAIN BY SLUG
============================ */
export const getDomainBySlug = async (req, res) => {
  try {
    const domain = await Domain.findOne({ slug: req.params.slug });
    if (!domain) return res.status(404).json({ message: "Domain not found" });

    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   UPDATE DOMAIN
============================ */
export const updateDomain = async (req, res) => {
  try {
    const { name, imageUrl, description, whyChoose } = req.body;

    const updateData = {
      ...(name && { name: name.trim(), slug: slugify(name.trim(), { lower: true }) }),
      ...(imageUrl && { imageUrl }),
      ...(description && { description: description.trim() }),
      ...(whyChoose && { whyChoose: Array.isArray(whyChoose) ? whyChoose : [] }),
    };

    const updated = await Domain.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Domain not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   DELETE DOMAIN
============================ */
export const deleteDomain = async (req, res) => {
  try {
    const deleted = await Domain.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Domain not found" });

    res.json({ message: "Domain deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
