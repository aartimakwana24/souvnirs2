import mongoose from "mongoose";

const addToCartSchema = mongoose.Schema({
  paid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductAttribute",
    required: true,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("addToCartSchema", addToCartSchema,"AddToCart");