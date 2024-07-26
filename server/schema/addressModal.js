// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema(
//   {
//     customer_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },
//     email: { type: String },
//     address: { type: String },
//     name: {
//       type: String,
//     },
//     type: {
//       type: String,
//       enum: ["home", "office", "other"],
//     },
//     city: { type: String, required: true },
//     country: { type: String, required: true },
//     pin_code: { type: String, required: false },
//     notes: { type: String },
//     status: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("addressSchema", addressSchema , "Address");


import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    email: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },

    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["home", "office", "other"],
    },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pin_code: { type: String, required: false },
    notes: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("addressSchema", addressSchema, "Address");



