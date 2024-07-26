import productVarients2 from "../schema/productVarients2.js";
import mongoose from "mongoose";
export const createVarient = async (req, res) => {
  try {
    let varients = req.body.combination;
    let pid = req.body.productId;
    const productVarient = new productVarients2({
      pid,
      varients,
    });
    const savedProductVari = await productVarient.save();
    res.status(201).json(productVarient);
  } catch (error) {
    console.error("Failed to create product varients ", error);
    res.status(400).json({ error: "Failed to create product varients" });
  }
};

export const getAllVarientById = async (req, res) => {
  try {
    const { id } = req.params;
    let allVarientsData = await productVarients2.find({ pid: id });
    res.status(200).json(allVarientsData);
  } catch (error) {
    console.log("error in getAllVarient ", error);
  }
};

export const getAllVarients = async(req,res)=>{
try {
  const varientsData = await productVarients2.find();
  res.status(200).json(varientsData);
} catch (error) {
  console.log("Error in getAllVarients ",error);
}
}

export const getVarientsBasedOnPid = async (req, res) => {
  try {
    const { pid } = req.params;
    const varientsData = await productVarients2.find({pid:pid});
    res.status(200).json(varientsData);
  } catch (error) {
    console.log("Error in getAllVarients ", error);
  }
};

export const insertVarient = async (req, res) => {
  try {
    const { pid } = req.params;
    const { combination } = req.body;

    const newRecord = new productVarients2({
      pid: new mongoose.Types.ObjectId(pid),
      varients: combination,
    });
    await newRecord.save();

    res.status(201).json({ message: "Variant inserted successfully" });
  } catch (error) {
    console.error("Error inserting variant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isEqual = (obj1, obj2) => {
  const values1 = Object.values(obj1).sort().join(",");
  const values2 = Object.values(obj2).sort().join(",");
  return values1 === values2;
};

export const updateVarient = async (req, res) => {
   const productId = req.params.id;
   const uniqueVariant = req.body;
   try {
     const existingVariants = await productVarients2.find({ pid: productId });

     const found = existingVariants.some((variant) =>
       isEqual(variant.varients[0], uniqueVariant)
     );
     if (found) {
       await productVarients2.deleteOne({
         pid: productId,
         varients: [uniqueVariant],
       });
       res.status(200).json({ message: "Variant deleted successfully." });
     }
     else {
       await productVarients2.create({
         pid: productId,
         varients: [uniqueVariant],
       });
       res.status(201).json({ message: "Variant inserted successfully." });
     }
   } catch (error) {
     console.error("Error occurred:", error);
     res.status(500).json({ error: "Internal server error." });
   }
};

export const deleteVarient = async (req, res) => {
  try {
    const { pid } = req.params;
    const { removedCombination } = req.body;

    await productVarients2.findOneAndUpdate(
      {
        pid: new mongoose.Types.ObjectId(pid),
        varients: removedCombination,
      },
      { $pull: { varients: removedCombination } }
    );

    res.status(200).json({ message: "Variant deleted successfully" });
  } catch (error) {
    console.error("Error deleting variant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};