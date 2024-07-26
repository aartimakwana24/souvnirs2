import mongoose from "mongoose";

const AttributeType = new mongoose.Schema({
  paid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductAttribute",
  },
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  attvalue: {
    type: [String],
  },
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
    enum: ["ACTIVE", "INACTIVE"],
  },
});

export default mongoose.model("AttributeType", AttributeType, "AttributeType");
