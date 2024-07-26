import mongoose from "mongoose";
const CollectionSchema = new mongoose.Schema(
  {
    collectionConditionId: [
      {
        type: String,
      },
    ],
    conditionValue: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConditionValue",
      },
    ],
    inputValue: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    diactiveProductId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "PENDING"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collection", CollectionSchema, "Collection");
