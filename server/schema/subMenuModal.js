import mongoose from "mongoose";
const subMenuSchema = new mongoose.Schema(
  {
    mainMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainMenu",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    typeValue: { type: String },
    link: {
      type: String,
    },
    orderNo: {
      type: String,
    },
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

export default mongoose.model("SubMenu", subMenuSchema, "SubMenu");
