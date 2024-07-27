import productModal from "../schema/product.js";
import productVarients from "../schema/productVarients.js";
import productVarients2 from "../schema/productVarients2.js";
import vendorModal from "../schema/vendorModal.js";
import mongoose from "mongoose";
import categoriesModal from "../schema/categoriesModal.js";
import productAttributeType from "../schema/productAttributeType.js";
import attributeModal from "../schema/attributeModal.js";
import product from "../schema/product.js";

export const createProduct = async (req, res) => {
  try {
    let { name, vendorId, attributes, categoryId } = req.body;
    if (req.role == "vendor") {
      vendorId = req.userId;
    }

    let attArr = attributes.map((att) => att._id);

    const product = new productModal({
      name,
      vendorId,
      selectedAtt: attArr,
      categoryId,
    });
    const savedProduct = await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    let varientsList;
    varientsList = await productVarients2.aggregate([
      {
        $lookup: {
          from: "Product",
          localField: "pid",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ]);

    res.status(200).json(varientsList);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get all products" });
  }
};

export const getProductVariants = async (req, res) => {
  try {
    const { productId } = req.params;
    const products = await productVarients.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "Product",
          localField: "pid",
          foreignField: "_id",
          as: "result",
        },
      },
    ]);

    const vendorId = products[0].result[0].vendorId.toString();
    const vendor = await vendorModal.findOne({ _id: vendorId });
    const vName = vendor ? vendor.firstName : "";

    const categoryId = products[0].result[0].categoryId.toString();
    const category = await categoriesModal.findOne({ _id: categoryId });

    const selectedAtt = products[0].result[0].selectedAtt || [];

    const attributeObjects = await attributeModal.find({
      _id: { $in: selectedAtt },
    });

    const attributeNameMap = attributeObjects.reduce((acc, attribute) => {
      acc[attribute._id.toString()] = attribute.name;
      return acc;
    }, {});

    const pid = products[0].result[0]._id;

    const attributeValues = [];
    for (const attId of selectedAtt) {
      const values = await productAttributeType.find({
        pid: new mongoose.Types.ObjectId(pid),
        paid: attId,
      });
      if (values.length > 0) {
        attributeValues.push(...values);
      }
    }

    const groupedAttributeValues = attributeValues.reduce((acc, attrValue) => {
      const attrName = attributeNameMap[attrValue.paid.toString()];
      if (!acc[attrName]) {
        acc[attrName] = [];
      }
      acc[attrName].push(attrValue.attvalue);
      return acc;
    }, {});

    const varientsData = await productVarients.findOne({
      pid: new mongoose.Types.ObjectId(pid),
    });

    const updatedProductData = {
      ...products[0],
      vName,
      catData: category,
      attributeObjects,
      attValues: groupedAttributeValues,
      showVarients: varientsData,
    };
    res.status(200).json(updatedProductData);
  } catch (error) {
    console.log("Error in getProductVariants ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const updateProduct = async (req, res) => {
//   try {
//     const { vendorId, name, selectedAttributes, categoryId } =
//       req.body.formData;
//     const productId = req.params.id;
//     const selectedAttIds = selectedAttributes.map((attr) => attr._id);
//     const id = (await productVarients2.findById(productId)).pid.toString();

//     for (const attribute of selectedAttributes) {
//       let attributeType = await productAttributeType.findOne({
//         pid: id,
//         paid: attribute._id,
//       });

//       if (!attributeType) {
//         attributeType = new productAttributeType({
//           pid: id,
//           paid: attribute._id,
//           attvalue: [],
//           CreatedTime: new Date(),
//           UpdatedTime: new Date(),
//           Status: "ACTIVE",
//         });
//       }

//       const newValues = req.body.formData[attribute.name];
//       if (newValues) {
//         attributeType.attvalue = Array.isArray(newValues[0])
//           ? newValues[0]
//           : newValues;
//       }

//       await attributeType.save();
//     }

//     const updatedProduct = await productModal.findByIdAndUpdate(
//       id,
//       { vendorId, name, selectedAtt: selectedAttIds, categoryId },
//       { new: true }
//     );

//     const allAttributesValues = await productAttributeType.find({
//       pid: id,
//       paid: { $in: selectedAttIds },
//     });
//     const paidValues = allAttributesValues.map((attr) => attr.paid);

//     const attributesName = await attributeModal.find({
//       _id: { $in: paidValues },
//     });

//     res.status(200).json({ attributesName, allAttributesValues, id });
//   } catch (error) {
//     console.log("Error in updateProduct controller ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productVariant = await productVarients2.findOne({ _id });
    if (!productVariant) {
      console.log("Product variant not found");
      return res.status(404).json({ error: "Product variant not found" });
    }

    const pid = productVariant.pid;

    const deletedProduct = await product.findByIdAndDelete(pid);
    const deletedProductVarients2 = await productVarients2.findByIdAndDelete(
      pid
    );
    if (!deletedProduct && !deletedProductVarients2) {
      console.log("Product not found");
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVarients2 = async (req, res) => {
  try {
    let varientsList;
    varientsList = await productVarients2.aggregate([
      {
        $lookup: {
          from: "Product",
          localField: "pid",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ]);
    res.status(200).json(varientsList);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get all products" });
  }
};

export const getProductVariants2 = async (req, res) => {
  try {
    const { productId } = req.params;
    const products = await productVarients2.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "Product",
          localField: "pid",
          foreignField: "_id",
          as: "result",
        },
      },
    ]);
    const vendorId = products[0].result[0].vendorId.toString();
    const vendor = await vendorModal.findOne({ _id: vendorId });
    const vName = vendor ? vendor.firstName : "";

    const categoryId = products[0].result[0].categoryId.toString();
    const category = await categoriesModal.findOne({ _id: categoryId });
    const selectedAtt = products[0].result[0].selectedAtt || [];

    const attributeObjects = await attributeModal.find({
      _id: { $in: selectedAtt },
    });

    const attributeNameMap = attributeObjects.reduce((acc, attribute) => {
      acc[attribute._id.toString()] = attribute.name;
      return acc;
    }, {});

    const pid = products[0].result[0]._id;

    const attributeValues = [];
    for (const attId of selectedAtt) {
      const values = await productAttributeType.find({
        pid: new mongoose.Types.ObjectId(pid),
        paid: attId,
      });
      if (values.length > 0) {
        attributeValues.push(...values);
      }
    }

    const groupedAttributeValues = attributeValues.reduce((acc, attrValue) => {
      const attrName = attributeNameMap[attrValue.paid.toString()];
      if (!acc[attrName]) {
        acc[attrName] = [];
      }
      acc[attrName].push(attrValue.attvalue);
      return acc;
    }, {});

    const varientsData = await productVarients2.findOne({
      pid: new mongoose.Types.ObjectId(pid),
    });

    const updatedProductData = {
      ...products[0],
      vName,
      catData: category,
      attributeObjects,
      attValues: groupedAttributeValues,
      showVarients: varientsData,
    };
    res.status(200).json(updatedProductData);
  } catch (error) {
    console.log("Error in getProductVariants ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct2 = async (req, res) => {
  try {
    const { vendorId, name, selectedAttributes, categoryId } =
      req.body.formData;
    const productId = req.params.id;
    const selectedAttIds = selectedAttributes.map((attr) => attr._id);
    const id = (await productVarients2.findById(productId)).pid.toString();

    for (const attribute of selectedAttributes) {
      let attributeType = await productAttributeType.findOne({
        pid: id,
        paid: attribute._id,
      });

      if (!attributeType) {
        attributeType = new productAttributeType({
          pid: id,
          paid: attribute._id,
          attvalue: [],
          CreatedTime: new Date(),
          UpdatedTime: new Date(),
          Status: "ACTIVE",
        });
      }

      const newValues = req.body.formData[attribute.name];
      if (newValues) {
        attributeType.attvalue = Array.isArray(newValues[0])
          ? newValues[0]
          : newValues;
      }
      await attributeType.save();
    }

    const updatedProduct = await productModal.findByIdAndUpdate(
      id,
      { vendorId, name, selectedAtt: selectedAttIds, categoryId },
      { new: true }
    );

    const allAttributesValues = await productAttributeType.find({
      pid: id,
      paid: { $in: selectedAttIds },
    });
    const paidValues = allAttributesValues.map((attr) => attr.paid);

    const attributesName = await attributeModal.find({
      _id: { $in: paidValues },
    });

    res.status(200).json({ attributesName, allAttributesValues, id });
  } catch (error) {
    console.log("Error in updateProduct controller ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
