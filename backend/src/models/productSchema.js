import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    price: {
      required: true,
      type: Number,
      min: 0,
    },
    img: {
      required: true,
      type: String,
    },
    stock: {
      type: Number,
      default: 6,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
