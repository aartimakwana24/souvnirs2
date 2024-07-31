import productModal from "../schema/product.js";
import productVarients from "../schema/productVarients.js";
import productVarients2 from "../schema/productVarients2.js";
import vendorModal from "../schema/vendorModal.js";
import mongoose from "mongoose";
import categoriesModal from "../schema/categoriesModal.js";
import productAttributeType from "../schema/productAttributeType.js";
import attributeModal from "../schema/attributeModal.js";
import varientsDetails from "../schema/productVarientsDetails.js";
import personalized from "../schema/productVariantsPersonalized.js";

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
    console.log("productId ", productId);
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

    console.log("getProductVariants products", products);
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

export const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log("_id ", _id);
    const productVariant = await productVarients2.findOne({ _id });
    if (!productVariant) {
      console.log("Product variant not found");
      return res.status(404).json({ error: "Product variant not found" });
    }

    const pid = productVariant.pid;

    console.log("pid ", pid);
    const deletedProduct = await productModal.findByIdAndDelete(pid);
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

// export const getActiveProductsById = async (req, res) => {
//   try {
//     const productIds = req.query.ids;
//     const products = await productModal.find({ _id: { $in: productIds } });
//     const productObjectIds = products.map((product) => product._id);

//     const variants = await productVarients2.find({
//       pid: { $in: productObjectIds },
//     });

//     const variantIds = variants.map((variant) => variant._id);

//     const variantDetails = await varientsDetails.find({
//       pvid: { $in: variantIds },
//     });

//     const personalizedImages = await personalized.find({
//       pvid: { $in: variantIds },
//     });

//     const productVariantDetails = products.map((product) => {
//       const productVariants = variants.filter(
//         (variant) => variant.pid.toString() === product._id.toString()
//       );
//       const productVariantDetail = productVariants.map((variant) => {
//         const details = variantDetails.filter(
//           (detail) => detail.pvid.toString() === variant._id.toString()
//         );
//         const personalized = personalizedImages.find(
//           (personalized) =>
//             personalized.pvid.toString() === variant._id.toString()
//         );
//         return {
//           ...variant._doc,
//           details,
//           cropImgUrl: personalized ? personalized.cropImgUrl : null,
//         };
//       });
//       return {
//         ...product._doc,
//         variants: productVariantDetail,
//       };
//     });

//     const attributeIds = products.flatMap((product) => product.selectedAtt);

//     const attributes = await attributeModal.find({
//       _id: { $in: attributeIds },
//     });

//     const attributeTypeIds = attributes.map((attribute) => attribute._id);
//     const attributeTypes = await productAttributeType.find({
//       paid: { $in: attributeTypeIds },
//     });

//     const filterList = attributes.reduce((acc, attribute) => {
//       const attributeName = attribute.name;
//       const attributeType = productAttributeType.find(
//         (type) => type.paid.toString() === attribute._id.toString()
//       );
//       if (!acc[attributeName]) {
//         acc[attributeName] = [];
//       }
//       if (attributeType) {
//         acc[attributeName] = [
//           ...new Set([...acc[attributeName], ...attributeType.attvalue]),
//         ];
//       }
//       return acc;
//     }, {});

//     res.json({ productVariantDetails, filterList });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//     console.log("Error in getActiveProductsById ", error);
//   }
// };


export const getActiveProductsById = async (req, res) => {
  try {
    const productIds = req.query.ids;
    const products = await productModal.find({ _id: { $in: productIds } });
    const productObjectIds = products.map((product) => product._id);

    const variants = await productVarients2.find({
      pid: { $in: productObjectIds },
    });

    const variantIds = variants.map((variant) => variant._id);

    const variantDetails = await varientsDetails.find({
      pvid: { $in: variantIds },
    });

    const personalizedImages = await personalized.find({
      pvid: { $in: variantIds },
    });

    const productVariantDetails = products.map((product) => {
      const productVariants = variants.filter(
        (variant) => variant.pid.toString() === product._id.toString()
      );
      const productVariantDetail = productVariants.map((variant) => {
        const details = variantDetails.filter(
          (detail) => detail.pvid.toString() === variant._id.toString()
        );
        const personalized = personalizedImages.find(
          (personalized) =>
            personalized.pvid.toString() === variant._id.toString()
        );
        return {
          ...variant._doc,
          details,
          cropImgUrl: personalized ? personalized.cropImgUrl : null,
        };
      });
      return {
        ...product._doc,
        variants: productVariantDetail,
      };
    });

    const attributeIds = products.flatMap((product) => product.selectedAtt);

    const attributes = await attributeModal.find({
      _id: { $in: attributeIds },
    });

    const attributeTypeIds = attributes.map((attribute) => attribute._id);
    const attributeTypes = await productAttributeType.find({
      paid: { $in: attributeTypeIds },
    });

    const filterList = attributes.reduce((acc, attribute) => {
      const attributeName = attribute.name;
      if (!acc[attributeName]) {
        acc[attributeName] = [];
      }
      const attributeType = attributeTypes.find(
        (type) => type.paid.toString() === attribute._id.toString()
      );
      if (attributeType) {
        acc[attributeName] = [
          ...new Set([...acc[attributeName], ...attributeType.attvalue]),
        ];
      }
      return acc;
    }, {});

    res.json({ productVariantDetails, filterList });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
    console.log("Error in getActiveProductsById ", error);
  }
};
