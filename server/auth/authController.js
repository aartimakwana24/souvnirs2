import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import vendorModal from "../schema/vendorModal.js";
import customerModal from "../schema/customerModal.js";
import addressModal from "../schema/addressModal.js";
import adminModal from "../schema/adminModal.js";
import userModal from "../schema/userModal.js";
import crypto from "crypto";

export const secretKey = crypto.randomBytes(
  Math.floor(Math.random() * (64 - 16 + 1)) + 16
);
// export const registerVendor = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//     //   otp,
//     //   otpStatus,
//       mobile,
//       status,
//     } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const isExists = await vendorModal.findOne({ email });
//     if (isExists) {
//       return res
//         .status(400)
//         .json({ error: "vendor with provided email address already exists." });
//     }

//     // Create the vendor in the database
//     await vendorModal.create({
//       firstName,
//       lastName,
//       email,
//     //   otp,
//     //   otpStatus,
//       mobile,
//       status,
//       password: hashedPassword,
//     });

//     // Find the newly created vendor
//     const vendor = await vendorModal.findOne({ email });

//     if (!vendor) {
//       return res
//         .status(400)
//         .json({ error: "Vendor not found after registration" });
//     }

//     // await sendEmail(
//     //   "pratul.udainiya@rechargestudio.com",
//     //   "new vendor registered",
//     //   `vendor with email address: ${vendor.email} and name: ${vendor.firstName} ${vendor.lastName}`
//     // );

//     // Generate and send the JWT token to the front end
//     const token = jwt.sign({ id: vendor._id, role: "vendor" }, secretKey, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({ message: "vendor registered successfully", token });
//   } catch (error) {
//     console.error("Error registering vendor:", error);
//     res.status(400).json({ error: "somthing went wrong" });
//   }
// };

// export const registerCustomer = async (req, res) => {
//   try {
//     const { city, pincode, country, email } = req.body;
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const alreadyExists = await customerModal.findOne({ email });
//     if (alreadyExists) {
//       return res.status(400).json("customer with given email already exists");
//     }
//     const customer = await customerModal.create({
//       ...req.body,
//       password: hashedPassword,
//     });
//     addressModal.create({
//       customer_id: customer._id,
//       city,
//       pin_code: pincode,
//       country,
//     });
//     const token = jwt.sign({ role: "customer", id: customer._id }, secretKey, {
//       expiresIn: "7d",
//     });

//     // await sendEmail(
//     //   "pratul.udainiya@rechargestudio.com",
//     //   "New Customer Registered",
//     //   `Customer with following email address registered: ${customer.email}`
//     // );
//     // await sendEmail(
//     //   email,
//     //   "Welcome to Souvnirs",
//     //   "Sign in to see exciting deals"
//     // );

//     res.status(200).json({ message: "User registered successfully!", token });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(400).json({ error: "somthing went wrong" });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const customer = await customerModal.findOne({ email });
//     const vendor = await vendorModal.findOne({ email });
//     const admin = await adminModal.findOne({ email });

//     if (!customer && !vendor && !admin) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     let role;
//     if (admin) {
//       role = "admin";
//     } else if (vendor) {
//       role = "vendor";
//     } else {
//       role = "customer";
//     }

//     const user = customer || vendor || admin;
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ email, role, id: user._id }, secretKey, {
//       expiresIn: "7h",
//     });

//     res.status(200).json({ token });
//   } catch (error) {

//     console.error("Error in loginUser:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const registerVendor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      //   otp,
      //   otpStatus,
      mobile,
      status,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExists = await vendorModal.findOne({ email });
    if (isExists) {
      return res
        .status(400)
        .json({ error: "vendor with provided email address already exists." });
    }

    // Create the vendor in the database
    await vendorModal.create({
      firstName,
      lastName,
      email,
      //   otp,
      //   otpStatus,
      mobile,
      status,
      password: hashedPassword,
    });

    // Find the newly created vendor
    const vendor = await vendorModal.findOne({ email });

    if (!vendor) {
      return res
        .status(400)
        .json({ error: "Vendor not found after registration" });
    }

    // await sendEmail(
    //   "pratul.udainiya@rechargestudio.com",
    //   "new vendor registered",
    //   `vendor with email address: ${vendor.email} and name: ${vendor.firstName} ${vendor.lastName}`
    // );

    // Generate and send the JWT token to the front end
    const token = jwt.sign({ id: vendor._id, role: "vendor" }, secretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "vendor registered successfully", token });
  } catch (error) {
    console.error("Error registering vendor:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

export const registerCustomer = async (req, res) => {
  try {
    const { city, pincode, country, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const alreadyExists = await customerModal.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json("customer with given email already exists");
    }
    const customer = await customerModal.create({
      ...req.body,
      password: hashedPassword,
    });
    addressModal.create({
      customer_id: customer._id,
      city,
      pin_code: pincode,
      country,
    });
    const token = jwt.sign({ role: "customer", id: customer._id }, secretKey, {
      expiresIn: "7d",
    });

    // await sendEmail(
    //   "pratul.udainiya@rechargestudio.com",
    //   "New Customer Registered",
    //   `Customer with following email address registered: ${customer.email}`
    // );
    // await sendEmail(
    //   email,
    //   "Welcome to Souvnirs",
    //   "Sign in to see exciting deals"
    // );

    res.status(200).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await customerModal.findOne({ email });
    const vendor = await vendorModal.findOne({ email });
    const admin = await adminModal.findOne({ email });

    if (!customer && !vendor && !admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let role;
    if (admin) {
      role = "admin";
    } else if (vendor) {
      role = "vendor";
    } else {
      role = "customer";
    }

    const user = customer || vendor || admin;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email, role, id: user._id }, secretKey, {
      expiresIn: "7h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
