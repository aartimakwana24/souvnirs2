import mongoose from "mongoose";

const VarientsDetails = new mongoose.Schema({
  pvid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVarients2",
  },
  quantity: {
    type: Number,
  },
  images: [
    {
      type: String,
    },
  ],
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  sku: {
    type: String,
  },
  tags: {
    type: [String],
  },
  readyToShip: {
    type: Boolean,
  },
  freeShipping: {
    type: Boolean,
  },
  data: [
    {
      price: {
        type: String,
      },
      minQuantity: {
        type: String,
      },
      currency: {
        type: String,
      },
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
});

export default mongoose.model(
  "VarientsDetails",
  VarientsDetails,
  "VarientsDetails"
);
