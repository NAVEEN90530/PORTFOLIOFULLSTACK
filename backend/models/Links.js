import mongoose from "mongoose";

const linksSchema = new mongoose.Schema(
  {
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
    instagram: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Links", linksSchema);
