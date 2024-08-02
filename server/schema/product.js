import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendors",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategories",
    },
    stockStatus: {
      type: String,
      default: "IN_STOCK",
    },
    slug: {
      type: String,
    },
    approval: {
      type: String,
      default: "APPROVE",
    },
    selectedAtt: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddAttribute",
      },
    ],
    CreatedTime: {
      type: Date,
      default: Date.now,
    },
    UpdatedTime: {
      type: Date,
      default: Date.now,
    },
    Status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DRAFT"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("productSchema", productSchema, "Product");
