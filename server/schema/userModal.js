import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
    },
    organizationType: {
      type: String,
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    orderTypeInterested: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("userSchema", userSchema, "User");






























    // country: {
    //   type: String,
    // },
    // city: {
    //   type: String,
    // },
    // pincode: {
    //   type: String,
    // },

    // otp: {
    //   type: String,
    // },
    // otpStatus: {
    //   type: String,
    // },
    // status: {
    //   type: String,
    // },