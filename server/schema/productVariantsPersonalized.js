import mongoose from "mongoose";

const VarientsPersonalized = new mongoose.Schema({
  pvid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVarients2",
  },
  imgUrl: [
    {
      type: String,
    },
  ],
  cropImgUrl: {
    type: String,
  },
  // width: {
  //   type: Number,
  // },
  // height: {
  //   type: Number,
  // },
  // ratio: {
  //   type: Number,
  // },
  // type: {
  //   type: String,
  // },
  customization: {
    type: mongoose.Schema.Types.Mixed,
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

export default mongoose.model(
  "VarientsPersonalized",
  VarientsPersonalized,
  "VarientsPersonalized"
);
