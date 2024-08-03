import conditionValueModal from "../schema/conditionValueModal.js";
import categoriesModal from "../schema/categoriesModal.js";
import vendorModal from "../schema/vendorModal.js";
import productModal from "../schema/product.js";
import productVarients2 from "../schema/productVarients2.js";
import VarientsDetails from "../schema/productVarientsDetails.js";
import { getOperator } from "../utils/index.js";
import Collection from "../schema/collectionModal.js";
import mongoose, { Mongoose } from "mongoose";
import collection from "../routes/collectionRoutes.js";

const addConditionToQuery = (query, condition, radioSelection) => {
  if (radioSelection === "all") {
    query.$and.push(condition);
  } else {
    query.$or.push(condition);
  }
};

const buildPriceQuery = (condition, inputValue, operator) => {
  const priceValue = parseFloat(inputValue);
  return { price: { [operator]: priceValue } };
};

const buildQuantityQuery = (condition, inputValue, operator) => {
  const quantityValue = parseFloat(inputValue);
  if (operator === "$ne") {
    return { quantity: { $not: { $eq: quantityValue } } };
  }
  return { quantity: { [operator]: quantityValue } };
};

const getTagsQuery = (condition, inputValue) => {
  let tagsQuery = {};

  switch (condition.conditionValue) {
    case "contains":
      tagsQuery = { tags: { $regex: inputValue, $options: "i" } };
      break;
    case "does not contain":
      tagsQuery = { tags: { $not: { $regex: inputValue, $options: "i" } } };
      break;
    case "start with":
      tagsQuery = { tags: { $regex: `^${inputValue}`, $options: "i" } };
      break;
    case "end with":
      tagsQuery = { tags: { $regex: `${inputValue}$`, $options: "i" } };
      break;
    default:
      break;
  }

  return tagsQuery;
};

const getVarientsDetailsQuery = async (
  condition,
  selectedTitle,
  inputValue,
  operator
) => {
  let query;
  if (selectedTitle === "price") {
    query = buildPriceQuery(condition, inputValue, operator);
  } else if (selectedTitle === "quantity") {
    query = buildQuantityQuery(condition, inputValue, operator);
  } else if (selectedTitle === "tags") {
    query = getTagsQuery(condition, inputValue);
  }
  return query;
};

export const getRawDataForFilter = async (req, res) => {
  try {
    const conditionsArray = req.body.changedTitleFilterArr;
    console.log("req.body ",req.body);
    console.log("conditionsArray ", conditionsArray);
    console.log(
      "req.body.changedTitleFilterArr.selectedTitle ",
      req.body.changedTitleFilterArr[0].selectedTitle
    );

    const radioSelection = req.body.radioSelection;
    let filteredProducts = [];
    let query;
    if (radioSelection === "all") {
      query = {
        $and: [],
      };
    } else {
      query = {
        $or: [],
      };
    }

    for (const condition of conditionsArray) {
      let { selectedTitle, conditionValue, inputValue } = condition;
      let actualConditionValue;
      if (mongoose.Types.ObjectId.isValid(conditionValue)) {
        actualConditionValue = await conditionValueModal.find({
          _id: conditionValue,
        });
        console.log("actualConditionValue in if ", actualConditionValue);
      } else {
        actualConditionValue = await conditionValueModal.find({
          conditionValue: conditionValue,
        });
        console.log("actualConditionValue in else ", actualConditionValue);
      }

      if (actualConditionValue) {
        condition.conditionValue = actualConditionValue[0].conditionValue;
        const operator = getOperator(condition.conditionValue);
        console.log("operator is ", operator);
        switch (selectedTitle) {
          case "category":
            const categories = await categoriesModal.find({
              name: { $regex: inputValue, $options: "i" },
            });
            if (categories && categories.length > 0) {
              const categoryIds = categories.map((c) => c._id);
              const categoryCondition =
                operator === "$ne"
                  ? { categoryId: { $nin: categoryIds } }
                  : { categoryId: { $in: categoryIds } };
              addConditionToQuery(query, categoryCondition, radioSelection);
            }
            break;
          case "Vendor":
            console.log("operator in vendors ", operator);
            const vendors = await vendorModal.find({
              $or: [
                { firstName: { $regex: inputValue, $options: "i" } },
                { email: { $regex: inputValue, $options: "i" } },
              ],
            });
            if (vendors && vendors.length > 0) {
              const vendorIds = vendors.map((v) => v._id);
              const vendorCondition =
                operator === "$ne"
                  ? { vendorId: { $nin: vendorIds } }
                  : { vendorId: { $in: vendorIds } };
              addConditionToQuery(query, vendorCondition, radioSelection);
            }
            break;
          case "name":
            const nameCondition = {};
            switch (condition.conditionValue) {
              case "contains":
                nameCondition.name = { $regex: inputValue, $options: "i" };
                break;
              case "does not contain":
                nameCondition.name = {
                  $not: { $regex: inputValue, $options: "i" },
                };
                break;
              case "start with":
                nameCondition.name = {
                  $regex: `^${inputValue}`,
                  $options: "i",
                };
                break;
              case "end with":
                nameCondition.name = {
                  $regex: `${inputValue}$`,
                  $options: "i",
                };
                break;
              default:
                break;
            }
            addConditionToQuery(query, nameCondition, radioSelection);
            break;
          case "tags":
            const tagsQuery = getTagsQuery(condition, inputValue);
            addConditionToQuery(query, tagsQuery, radioSelection);
            break;
          default:
            console.log("Defalut matched");
            const varientsQuery = await getVarientsDetailsQuery(
              condition,
              selectedTitle,
              inputValue,
              operator
            );
            const varientsDetails = await VarientsDetails.find(varientsQuery);
            if (varientsDetails) {
              const pvids = varientsDetails.map((v) => v.pvid);
              const productVarients = await productVarients2.find({
                _id: { $in: pvids },
              });
              const productIds = productVarients.map((pv) => pv.pid);
              const productIdsCondition =
                operator === "$ne"
                  ? { _id: { $nin: productIds } }
                  : { _id: { $in: productIds } };
              addConditionToQuery(query, productIdsCondition, radioSelection);
            }
            break;
        }
      }
    }

    const someMoreProducts = await productModal.find(query);
    filteredProducts = [...someMoreProducts];
    const uniqueFilteredProducts = Array.from(
      new Map(
        filteredProducts.map((product) => [product._id.toString(), product])
      ).values()
    );

    console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
    res.json(uniqueFilteredProducts);
  } catch (error) {
    console.error("Error occurred while filtering products", error);
    res.status(400).json({ error: "something went wrong" });
  }
};

export const createCollection = async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    console.log("error in createCollection controller ", error);
    res
      .status(400)
      .json({ error: "Failed to create collection", message: error.message });
  }
};

export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.status(200).json(collections);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve collections" });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id.substring(1));
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    console.log("Error in getCollectionById ", error);
    res.status(400).json({ error: "Failed to retrieve collection" });
  }
};

export const updateCollection = async (req, res) => {
  const {
    _id,
    inputValue,
    title,
    description,
    slug,
    diactiveProductId,
    status,
    radioSelection,
    collectionConditionId,
    conditionValue,
    selectedTitle,
  } = req.body;

  try {
    let idToUpdate = _id;

    let updatedConditionValues = [];
    for (let value of conditionValue) {
      if (mongoose.Types.ObjectId.isValid(value)) {
        updatedConditionValues.push(value);
      } else {
        const conditionDoc = await conditionValueModal.findOne({
          conditionValue: value,
        });

        if (!conditionDoc) {
          return res
            .status(404)
            .json({ error: `Condition document not found for value ${value}` });
        }

        updatedConditionValues.push(conditionDoc._id);
      }
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      idToUpdate,
      {
        collectionConditionId,
        conditionValue: updatedConditionValues,
        inputValue,
        title,
        slug,
        description,
        diactiveProductId,
        status,
        updatedAt: Date.now(),
        radioSelection,
        selectedTitle,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ error: "Failed to update collection" });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    console.log("Error in updateCollection controller", error);
    res
      .status(400)
      .json({ error: "Failed to update collection", message: error.message });
  }
};

export const deleteCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(
      req.params.id.substring(1)
    );

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.log("Error in deleteCollectionById", error);
    res.status(400).json({ error: "Failed to delete collection" });
  }
};

export const getCollectionBySlug = async (req, res) => {
  try {
    const slug = req.params.slug.trim(); 
    const normalizedSlug = slug.replace(/\s+/g, " ");
    const regex = new RegExp(
      `^${normalizedSlug.split(" ").join("\\s*")}$`,
      "i"
    );

    const collectionData = await Collection.findOne({
      slug: { $regex: regex },
    });
    if (collectionData) {
      res.status(200).json(collectionData);
    } else {
      res.status(200).json({msg:"No collection found based on that slug"});
    }
  } catch (error) {
    console.log("Error in getCollectionBySlug", error);
  }
};
