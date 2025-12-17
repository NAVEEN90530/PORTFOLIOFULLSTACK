import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // 👇 NEW DOMAIN FIELD
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    taglines: {
      type: [String],
      validate: {
        validator: (v) => v.length === 3,
        message: "Exactly 3 taglines are required",
      },
      required: true,
    },

    badge: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
