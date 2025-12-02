import Settings from "../models/Settings.js";

// GET ALL SETTINGS
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
    // console.log(JSON.stringify(settings))
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE CONTACT INFO
export const updateContact = async (req, res) => {
  try {
    const { email, phone, address } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        contact: { email: "", phone: "", address: "" },
        stats: { happyCustomers: 0, projectsCompleted: 0, projectTechnologies: 0 }
      });
    }

    settings.contact.email = email;
    settings.contact.phone = phone;
    settings.contact.address = address;

    await settings.save();

    res.json({ message: "Contact updated successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATS
export const updateStats = async (req, res) => {
  try {
    const { happyCustomers, projectsCompleted, projectTechnologies } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        contact: { email: "", phone: "", address: "" },
        stats: { happyCustomers: 0, projectsCompleted: 0, projectTechnologies: 0 }
      });
    }

    settings.stats.happyCustomers = happyCustomers;
    settings.stats.projectsCompleted = projectsCompleted;
    settings.stats.projectTechnologies = projectTechnologies;

    await settings.save();

    res.json({ message: "Stats updated successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
