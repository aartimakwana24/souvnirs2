import attributeModal from "../schema/attributeModal.js";
import categoriesModal from "../schema/categoriesModal.js";
import AttributeType from "../schema/productAttributeType.js";
import mongoose from "mongoose";

export const addAttribute = async (req, res) => {
  try {
    // const attribute = new attributeModal(req.body);
    const attribute = await attributeModal.create({
      name: req.body.name,
    });
    res.status(201).json(attribute);
  } catch (err) {
    console.log("Error in addAttribute contrller ", err);
    res.status(400).json({ error: err.message });
  }
};

export const getAllAttributes = async (req, res) => {
  try {
    const attributes = await attributeModal.find().sort({ createdAt: -1 });
    res.json(attributes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAttributeById = async (req, res) => {
  try {
    const attribute = await attributeModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json(attribute);
  } catch (err) {
    console.log("Error in updateAttributeById ", err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteAttributeById = async (req, res) => {
  try {
    const attribute = await attributeModal.findByIdAndDelete(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json({ message: "Attribute deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getattributesbyCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const data1 = await categoriesModal.findOne({ _id: id });
    const attributes = await categoriesModal.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "AddAttribute",
          localField: "attributes",
          foreignField: "_id",
          as: "result",
        },
      },
    ]);
    const data = attributes[0].result;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json("somwthing went wrong");
  }
};

// export const addAttributeValue = async(req,res)=>{
//   try {
//     console.log("addddddddddddddd")
//     console.log("req.body.productId:- ", req.body.productId);
//     console.log("req.body.productId:- ", req.body.attributeValues);

//   } catch (error) {
//     console.log("Error in addAttributeValue controller ",error);
//   }
// }

export const addAttributeValue = async (req, res) => {
  try {
    const productId = req.body.productId;
    const attributes = req.body.attributeValues;
    if (!productId || !Array.isArray(attributes)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const savedAttributes = await Promise.all(
      attributes.map(async (attr) => {
        const newAttribute = new AttributeType({
          paid: attr.id,
          pid: productId,
          attvalue: attr.values,
          Status: "ACTIVE",
        });

        return await newAttribute.save();
      })
    );

    res.status(201).json(savedAttributes);
  } catch (error) {
    console.error("Error adding attribute values: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
