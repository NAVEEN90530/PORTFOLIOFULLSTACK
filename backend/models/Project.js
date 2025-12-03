import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    imageUrl: { type: String, required: true },

    taglines: {
      type: [String],
      validate: v => v.length === 3, // exactly 3 taglines
      required: true,
    },

    badge: {
      type: Boolean,
      default: false, // 👈 default value
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
