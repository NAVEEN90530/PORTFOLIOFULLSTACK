import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true, // optional
    },

    whyChoose: {
      type: [String], // <-- change from String to array of Strings
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Domain", domainSchema);
