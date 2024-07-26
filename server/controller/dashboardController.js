import vendorModal from "../schema/vendorModal.js";
import fs from "fs";

export const fetchDashboardCardsData = async (req, res) => {
  try {
    const { role } = req;
    let vendors;
    if (role == "admin") {
      vendors = await vendorModal.find().count();
    }
  res.status(200).json({ vendors });

  } catch (error) {
    console.log("Error in fetchDashboardCardsData controller");
  res.status(400).json(error);
  }
};
