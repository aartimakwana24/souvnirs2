import mongoose from "mongoose";

const productAttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    created_time: {
      type: Date,
      default: Date.now,
    },
    updated_time: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "productAttributeSchema",
  productAttributeSchema,
  "AddAttribute"
);
