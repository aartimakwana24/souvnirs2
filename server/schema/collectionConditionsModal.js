import mongoose from "mongoose";
const CollectionConditionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    conditionValues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Condition Value",
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "ACTIVE",
    },
    CreatedTime: {
      type: Date,
      default: Date.now,
    },
    UpdatedTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "CollectionCondition",
  CollectionConditionSchema,
  "CollectionCondition"
);
