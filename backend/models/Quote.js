import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    category: String,
    message: String,
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
