import mongoose from "mongoose";
import VarientsDetails from "../schema/productVarientsDetails.js";
import VariantsPersonalized from "../schema/productVariantsPersonalized.js";

export const varientsDetailsController = async (req, res) => {
  try {
    const imageNames = req.files.map((file) => file.filename);
    let {
      pvid,
      quantity,
      status,
      description,
      price,
      tags,
      sku,
      readyToShip,
      freeShipping,
      data,
      customization,
      croppedImageUrl,
    } = req.body;

    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    if (typeof customization === "string") {
      customization = JSON.parse(customization);
    }

    if (req.role == "vendor") {
      vendorId = req.userId;
    }
    const productVarient = new VarientsDetails({
      pvid: pvid,
      quantity,
      desc: description,
      readyToShip: readyToShip,
      freeShipping: freeShipping,
      price,
      sku,
      tags,
      Status: status,
      images: imageNames,
      data: data || [],
    });
    const savedProduct = await productVarient.save();
    const personalizedData = new VariantsPersonalized({
      pvid: pvid,
      imgUrl: imageNames,
      cropImgUrl: croppedImageUrl,
      customization: customization,
    });
    const savedPersonalizedData = await personalizedData.save();
    res.status(201).json(productVarient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create product varient" });
  }
};

export const checkVarientController = async (req, res) => {
  try {
    const variantId = new mongoose.Types.ObjectId(req.params.id);
    const variant = await VarientsDetails.findOne({ pvid: variantId });
    if (variant) {
      return res.status(200).json({ exists: true, variant });
    } else {
      return res.status(200).json({ exists: false, variant });
    }
  } catch (error) {
    console.error("Error checking variant existence:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateVarientController = async (req, res) => {
  try {
    const variantId = req.params.id;
    const cleanInput = (input) => {
      if (
        input === "undefined" ||
        input === undefined ||
        input === null ||
        input === ""
      ) {
        return undefined;
      }
      if (
        typeof input === "string" &&
        (input.toLowerCase() === "true" || input.toLowerCase() === "false")
      ) {
        return input.toLowerCase() === "true";
      }
      return input;
    };

    const {
      quantity,
      status,
      description,
      price,
      tags,
      croppedImageUrl,
      sku,
      readyToShip,
      freeShipping,
      data,
    } = req.body;

    let { customization } = req.body;

    const imageNames = req.files ? req.files.map((file) => file.filename) : [];
    let parsedData = [];
    const cleanData = cleanInput(data);
    if (cleanData !== undefined) {
      if (typeof cleanData === "string") {
        try {
          parsedData = JSON.parse(cleanData);
        } catch (error) {
          console.error("Failed to parse data: ", error);
          return res.status(400).json({ error: "Invalid JSON format in data" });
        }
      } else if (Array.isArray(cleanData)) {
        parsedData = cleanData;
      }
    }

    let cleanCustomization = cleanInput(customization);
    if (cleanCustomization !== undefined) {
      if (typeof cleanCustomization === "string") {
        try {
          cleanCustomization = JSON.parse(cleanCustomization);
        } catch (error) {
          console.error("Failed to parse customization: ", error);
          return res
            .status(400)
            .json({ error: "Invalid JSON format in customization" });
        }
      }
    }

    const updateFields = {};
    if (cleanInput(quantity)) updateFields.quantity = cleanInput(quantity);
    if (cleanInput(status)) updateFields.status = cleanInput(status);
    if (cleanInput(description))
      updateFields.description = cleanInput(description);
    if (cleanInput(price)) updateFields.price = cleanInput(price);
    if (cleanInput(tags)) updateFields.tags = cleanInput(tags);
    if (cleanInput(croppedImageUrl))
      updateFields.croppedImageUrl = [cleanInput(croppedImageUrl)];
    if (cleanCustomization) updateFields.customization = cleanCustomization;
    if (cleanInput(sku)) updateFields.sku = cleanInput(sku);
    if (cleanInput(readyToShip) !== undefined)
      updateFields.readyToShip = cleanInput(readyToShip);
    if (cleanInput(freeShipping) !== undefined)
      updateFields.freeShipping = cleanInput(freeShipping);
    if (parsedData.length > 0) updateFields.data = parsedData;

    if (imageNames.length > 0) {
      updateFields.images = imageNames;
    }

    const schemaFields = Object.keys(VarientsDetails.schema.paths);
    const filteredUpdateFields = {};
    for (let key in updateFields) {
      if (schemaFields.includes(key)) {
        filteredUpdateFields[key] = updateFields[key];
      }
    }

    const updatedVariant = await VarientsDetails.findOneAndUpdate(
      { pvid: variantId },
      { $set: filteredUpdateFields },
      { new: true, runValidators: true }
    );

    if (!updatedVariant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    if (croppedImageUrl !== undefined && cleanCustomization !== undefined) {
      await VariantsPersonalized.findOneAndUpdate(
        { pvid: variantId },
        {
          $set: {
            imgUrl: imageNames,
            cropImgUrl: croppedImageUrl,
            customization: cleanCustomization || "",
          },
        },
        { new: true, upsert: true, runValidators: true }
      );
    }

    res.json(updatedVariant);
  } catch (error) {
    console.error("Error updating variant:", error);
    res.status(500).json({ error: "Failed to update variant" });
  }
};
