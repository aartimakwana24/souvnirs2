import mongoose from "mongoose";

const subMenuChild = new mongoose.Schema(
  {
    subMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubMenu",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    typeValue: { type: String },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChildMenu", subMenuChild,"ChildMenu");
