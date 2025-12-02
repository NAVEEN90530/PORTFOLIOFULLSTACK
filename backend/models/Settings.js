import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },

    stats: {
      happyCustomers: { type: Number, default: 0 },
      projectsCompleted: { type: Number, default: 0 },
      projectTechnologies: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
