import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
    },
    hsn_code: {
      type: String,
    },
    type: {
      type: String,
    },
    parentId: {
      type: String,
      default: "0",
    },
    createdTime: {
      type: Date,
    },
    upatedTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE"],
      default: "ACTIVE",
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddAttribute",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "categoriesSchema",
  categoriesSchema,
  "ProductCategories"
);
