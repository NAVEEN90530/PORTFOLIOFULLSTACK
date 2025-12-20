import Links from "../models/Links.js";  // Import Links model

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

    // URL pattern validation
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

    let links = await Links.findOne();
    if (!links) {
      // Create new entry if no links exist
      links = new Links({
        facebook: facebook && urlPattern.test(facebook) ? facebook : "",
        twitter: twitter && urlPattern.test(twitter) ? twitter : "",
        instagram: instagram && urlPattern.test(instagram) ? instagram : "",
        linkedin: linkedin && urlPattern.test(linkedin) ? linkedin : "",
        github: github && urlPattern.test(github) ? github : "",
      });
    } else {
      // Update only the fields that are passed
      if (facebook && urlPattern.test(facebook)) links.facebook = facebook;
      if (twitter && urlPattern.test(twitter)) links.twitter = twitter;
      if (instagram && urlPattern.test(instagram)) links.instagram = instagram;
      if (linkedin && urlPattern.test(linkedin)) links.linkedin = linkedin;
      if (github && urlPattern.test(github)) links.github = github;
    }

    await links.save();
    res.json({ message: "Links updated successfully", links });
    console.log("Links updated successfully");
    console.log(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
