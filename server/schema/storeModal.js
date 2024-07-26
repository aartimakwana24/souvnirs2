// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema(
//   {
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },
//     organizationName: {
//       type: String,
//       required: true,
//     },
//     organizationType: {
//       type: String,
//       required: true,
//     },
//     country: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     pinCode: {
//       type: String,
//       required: true,
//     },
//     orderTypeInterested: {
//       type: String,
//     },
//     organizationRole: {
//       type: String,
//     },
//     category_type_interest: {
//       type: String,
//     },
//     logo: {
//       type: String,
//     },
//     status: {
//       type: String,
//       enum: ["ACTIVE", "INACTIVE", "PENDING"],
//       default: "ACTIVE",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("storeSchema", storeSchema , "Store");


import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collections",
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("storeSchema", storeSchema, "Store");
