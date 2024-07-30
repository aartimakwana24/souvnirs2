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
    radioSelection: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "PENDING"],
      default: "ACTIVE",
    },
    slug: {
      type: String,
      unique: true,
    },
    selectedTitle : [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collection", CollectionSchema, "Collection");
