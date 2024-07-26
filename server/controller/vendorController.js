import vendorModal from "../schema/vendorModal.js";
export const getVendors = async (req, res) => {
  try {
    let vendors;
    if (req.role === "admin") {
      vendors = await vendorModal
        .aggregate([
          {
            $lookup: {
              from: "stores",
              localField: "_id",
              foreignField: "vendor_id",
              as: "store",
            },
          },
          {
            $unwind: {
              path: "$store",
              preserveNullAndEmptyArrays: true,
            },
          },
        ])
        .sort({ createdAt: -1 });
    } else if (req.role === "vendor") {
      vendors = await vendorModal.find({ _id: req.userId });
    }
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to get vendors" });
  }
};
