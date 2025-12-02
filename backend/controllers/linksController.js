import Links from "../models/Links.js";

// Get links
export const getLinks = async (req, res) => {
  try {
    const links = await Links.findOne();
    if (!links) return res.status(404).json({ message: "Links not found" });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update links
export const updateLinks = async (req, res) => {
  try {
    const { facebook, twitter, instagram, linkedin, github } = req.body;

    let links = await Links.findOne();
    if (!links) {
      links = new Links({ facebook, twitter, instagram, linkedin, github });
    } else {
      links.facebook = facebook;
      links.twitter = twitter;
      links.instagram = instagram;
      links.linkedin = linkedin;
      links.github = github;
    }

    await links.save();
    res.json({ message: "Links updated successfully", links });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
