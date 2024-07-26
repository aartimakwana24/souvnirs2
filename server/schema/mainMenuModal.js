import mongoose from "mongoose";

const mainMenuSchema = new mongoose.Schema(
  {
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    orderNo: {
      type: String,
    },
    typeValue: { type: String },
    link: {
      type: String,
    },
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

export default mongoose.model("MainMenu", mainMenuSchema, "MainMenu");
