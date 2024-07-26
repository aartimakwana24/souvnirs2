import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pvid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVarient",
  },
  desc: {
    type: String,
  },
  ratings: {
    type: Number,
  },
});

module.exports = mongoose.model("reviewsSchema", reviewsSchema, "Reviews");
