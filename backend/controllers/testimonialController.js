import Testimonial from "../models/Testimonial.js";

// Create Testimonial (Admin)
export const createTestimonial = async (req, res) => {
  const { name, companyName, content } = req.body;

  if (!name || !companyName || !content)
    return res.status(400).json({ message: "All fields required" });

  const testimonial = await Testimonial.create({
    name,
    companyName,
    content
  });

  res.status(201).json({ message: "Testimonial added", testimonial });
};

// Get All Testimonials (Public)
export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
};

// Delete Testimonial (Admin)
export const deleteTestimonial = async (req, res) => {
  const removed = await Testimonial.findByIdAndDelete(req.params.id);

  if (!removed)
    return res.status(404).json({ message: "Testimonial not found" });

  res.json({ message: "Deleted successfully" });
};

// Update Testimonial (Admin)
export const updateTestimonial = async (req, res) => {
  const { name, companyName, content } = req.body;

  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial)
    return res.status(404).json({ message: "Testimonial not found" });

  testimonial.name = name || testimonial.name;
  testimonial.companyName = companyName || testimonial.companyName;
  testimonial.content = content || testimonial.content;

  await testimonial.save();
  res.json({ message: "Testimonial updated", testimonial });
};
