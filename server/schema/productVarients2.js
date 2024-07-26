import mongoose from "mongoose";

const productVarientsSchema2 = new mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  varients: [
    {
      type: mongoose.Schema.Types.Mixed,
      // default: {},
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
    default: "DRAFT",
  },
});

export default mongoose.model(
  "productVarientsSchema2",
  productVarientsSchema2,
  "ProductVarients2"
);
