import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true, // optional
    },

    imageUrl: {
      type: String,
      required: true,
    },

    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate category per domain
categorySchema.index({ slug: 1, domain: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
