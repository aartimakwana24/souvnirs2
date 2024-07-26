// // import conditionValueModal from "../schema/conditionValueModal.js";
// // import categoriesModal from "../schema/categoriesModal.js";
// // import vendorModal from "../schema/vendorModal.js";
// // import productModal from "../schema/product.js";
// // import productVarients2 from "../schema/productVarients2.js";
// // import VarientsDetails from "../schema/productVarientsDetails.js";
// // import { getOperator } from "../utils/index.js";

// // const addConditionToQuery = (query, condition, radioSelection) => {
// //   if (radioSelection == "all") {
// //     query.$and.push(condition);
// //   } else {
// //     query.$or.push(condition);
// //   }
// // };

// // export const getRawDataForFilter = async (req, res) => {
// //   try {
// //     const conditionsArray = req.body.changedTitleFilterArr;
// //     const radioSelection = req.body.radioSelection;
// //     console.log("conditionsArray ", conditionsArray);
// //     let filteredProducts = [];
// //     let query;
// //     if (radioSelection == "all") {
// //       query = {
// //         $and: [],
// //       };
// //     } else {
// //       query = {
// //         $or: [],
// //       };
// //     }

// //     for (const condition of conditionsArray) {
// //       let { selectedTitle, conditionValue, inputValue } = condition;

// //       const actualConditionValue = await conditionValueModal.find({
// //         _id: conditionValue,
// //       });

// //       if (actualConditionValue) {
// //         condition.conditionValue = actualConditionValue[0].conditionValue;
// //         const operator = getOperator(condition.conditionValue);
// //         console.log("operator ", operator);
// //         let categories;
// //         if (selectedTitle == "category") {
// //           categories = await categoriesModal.find({
// //             name: { $regex: inputValue, $options: "i" },
// //           });
// //           if (categories) {
// //             const categoryIds = categories.map((c) => c._id);

// //             filteredProducts = await productModal.find({
// //               categoryId: { $in: categoryIds },
// //             });
// //           }
// //         }

// //         let vendors;
// //         if (selectedTitle === "vendorId") {
// //           vendors = await vendorModal.find({
// //             $or: [
// //               { firstName: { $regex: inputValue, $options: "i" } },
// //               { email: { $regex: inputValue, $options: "i" } },
// //             ],
// //           });
// //           const vendorIds = vendors.map((vendor) => {
// //             vendor._id;
// //             condition.inputValue = vendor._id;
// //           });
// //           if (condition.conditionValue === "equal") {
// //             filteredProducts = await productModal.find({
// //               vendorId: { $in: vendorIds },
// //             });
// //           } else if (condition.conditionValue === "not equal") {
// //             filteredProducts = await productModal.find({
// //               vendorId: { $nin: vendorIds },
// //             });
// //           }
// //           // res.json(filteredProducts);
// //           // return;
// //         }

// //         let productByName;
// //         if (selectedTitle === "Name") {
// //           productByName = await productModal.find({
// //             name: { $regex: inputValue, $options: "i" },
// //           });
// //           console.log("productByName ", productByName);
// //           if (productByName) {
// //             const productIds = productByName.map((p) => p._id);
// //             filteredProducts = await productModal.find({
// //               categoryId: { $in: productIds },
// //             });
// //           }
// //         }

// //         let productByPrice, priceQuery;
// //         if (selectedTitle === "price") {
// //           const priceValue = parseFloat(inputValue);
// //           switch (condition.conditionValue) {
// //             case "equal":
// //               priceQuery = { price: { $eq: priceValue } };
// //               break;
// //             case "not equal":
// //               priceQuery = { price: { $ne: priceValue } };
// //               break;
// //             case "greater than":
// //               priceQuery = { price: { $gt: priceValue } };
// //               break;
// //             case "less than":
// //               priceQuery = { price: { $lt: priceValue } };
// //               break;
// //             default:
// //               break;
// //           }
// //           productByPrice = await VarientsDetails.find(priceQuery);
// //           console.log("productByPrice ", productByPrice);
// //           if (productByPrice) {
// //             const vid = productByPrice.map((pp) => pp.pvid);
// //             let id2 = await productVarients2.find({
// //               _id: { $in: vid },
// //             });
// //             let productId = id2.map((pp) => pp.pid);
// //             if (productId) {
// //               filteredProducts = await productModal.find({
// //                 _id: { $in: productId },
// //               });
// //             }
// //           }
// //         }

// //         let varientByQuantity , quantityQuery;;
// //         if (selectedTitle === "quantity") {
// //           const quantityeValue = parseFloat(inputValue);

// //           switch (condition.conditionValue) {
// //             case "equal":
// //               quantityQuery = { quantity: { $eq: quantityeValue } };
// //               break;
// //             case "not equal":
// //               quantityQuery = { quantity: { $ne: quantityeValue } };
// //               break;
// //             case "greater than":
// //               quantityQuery = { quantity: { $gt: quantityeValue } };
// //               break;
// //             case "less than":
// //               quantityQuery = { quantity: { $lt: quantityeValue } };
// //               break;
// //             default:
// //               break;
// //           }
// //           varientByQuantity = await VarientsDetails.find(quantityQuery);
// //           console.log("varientByQuantity ", varientByQuantity);
// //           if (varientByQuantity) {
// //             const vid = varientByQuantity.map((pp) => pp.pvid);
// //             let id2 = await productVarients2.find({
// //               _id: { $in: vid },
// //             });
// //             let productId = id2.map((pp) => pp.pid);
// //             if (productId) {
// //               filteredProducts = await productModal.find({
// //                 _id: { $in: productId },
// //               });
// //             }
// //           }
// //         }

// //         if (condition.conditionValue === "equal") {
// //           inputValue = new RegExp(`^${inputValue}$`, "i");
// //         } else if (condition.conditionValue === "not equal") {
// //           inputValue = new RegExp(`^(?!${inputValue}$).*`, "i");
// //         } else if (condition.conditionValue == "start with") {
// //           inputValue = new RegExp(`^${inputValue}`, "i");
// //         } else if (condition.conditionValue === "end with") {
// //           inputValue = new RegExp(`${inputValue}$`, "gi");
// //         } else if (condition.conditionValue === "contains") {
// //           console.log("Inside else if contains");
// //           inputValue = new RegExp(inputValue, "gi");
// //         } else if (condition.conditionValue === "does not contain") {
// //           inputValue = new RegExp(inputValue, "gi");
// //         }

// //         let conditionQuery;
// //         if (selectedTitle == "vendorId") {
// //           conditionQuery = {
// //             [selectedTitle]: { [operator]: condition.inputValue.toString() },
// //           };
// //         } else {
// //           conditionQuery = {
// //             [selectedTitle]: { [operator]: inputValue },
// //           };
// //         }
// //         if (radioSelection == "all") {
// //           query.$and.push(conditionQuery);
// //         } else {
// //           query.$or.push(conditionQuery);
// //         }
// //       }
// //     }

// //     const someMoreProducts = await productModal.find(query);
// //     filteredProducts = [...someMoreProducts, ...filteredProducts];
// //     const uniqueFilteredProducts = Array.from(
// //       new Map(
// //         filteredProducts.map((product) => [product._id.toString(), product])
// //       ).values()
// //     );
// //     console.log("Finally all filtered ", filteredProducts);
// //     console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
// //     res.json(uniqueFilteredProducts);
// //   } catch (error) {
// //     console.error("Error occurred while filtering products", error);
// //     res.status(400).json({ error: "somthing went wrong" });
// //   }
// // };

// // import conditionValueModal from "../schema/conditionValueModal.js";
// // import categoriesModal from "../schema/categoriesModal.js";
// // import vendorModal from "../schema/vendorModal.js";
// // import productModal from "../schema/product.js";
// // import productVarients2 from "../schema/productVarients2.js";
// // import VarientsDetails from "../schema/productVarientsDetails.js";
// // import { getOperator } from "../utils/index.js";

// // const addConditionToQuery = (query, condition, radioSelection) => {
// //   if (radioSelection === "all") {
// //     query.$and.push(condition);
// //   } else {
// //     query.$or.push(condition);
// //   }
// // };

// // const buildPriceQuery = (condition, inputValue, operator) => {
// //   const priceValue = parseFloat(inputValue);
// //   return { price: { [operator]: priceValue } };
// // };

// // const buildQuantityQuery = (condition, inputValue, operator) => {
// //   const quantityValue = parseFloat(inputValue);
// //   return { quantity: { [operator]: quantityValue } };
// // };

// // const getTagsQuery = (condition, inputValue) => {
// //   let tagsQuery = {};

// //   switch (condition.conditionValue) {
// //     case "contains":
// //       tagsQuery = { tags: { $regex: inputValue, $options: "i" } };
// //       break;
// //     case "does not contain":
// //       tagsQuery = { tags: { $not: { $regex: inputValue, $options: "i" } } };
// //       break;
// //     case "start with":
// //       tagsQuery = { tags: { $regex: `^${inputValue}`, $options: "i" } };
// //       break;
// //     case "end with":
// //       tagsQuery = { tags: { $regex: `${inputValue}$`, $options: "i" } };
// //       break;
// //     default:
// //       break;
// //   }

// //   return tagsQuery;
// // };

// // const getVarientsDetailsQuery = async (
// //   condition,
// //   selectedTitle,
// //   inputValue,
// //   operator
// // ) => {
// //   let query;
// //   if (selectedTitle === "price") {
// //     query = buildPriceQuery(condition, inputValue, operator);
// //   } else if (selectedTitle === "quantity") {
// //     query = buildQuantityQuery(condition, inputValue, operator);
// //   } else if (selectedTitle === "tags") {
// //     query = getTagsQuery(condition, inputValue);
// //   }
// //   return query;
// // };

// // export const getRawDataForFilter = async (req, res) => {
// //   try {
// //     const conditionsArray = req.body.changedTitleFilterArr;
// //     const radioSelection = req.body.radioSelection;
// //     console.log("conditionsArray ", conditionsArray);
// //     let filteredProducts = [];
// //     let query;
// //     if (radioSelection === "all") {
// //       query = {
// //         $and: [],
// //       };
// //     } else {
// //       query = {
// //         $or: [],
// //       };
// //     }

// //     for (const condition of conditionsArray) {
// //       let { selectedTitle, conditionValue, inputValue } = condition;

// //       const actualConditionValue = await conditionValueModal.find({
// //         _id: conditionValue,
// //       });

// //       if (actualConditionValue) {
// //         condition.conditionValue = actualConditionValue[0].conditionValue;
// //         const operator = getOperator(condition.conditionValue);
// //         console.log("operator ", operator);

// //         if (selectedTitle === "category") {
// //           const categories = await categoriesModal.find({
// //             name: { $regex: inputValue, $options: "i" },
// //           });
// //           if (categories) {
// //             const categoryIds = categories.map((c) => c._id);
// //             addConditionToQuery(
// //               query,
// //               { categoryId: { $in: categoryIds } },
// //               radioSelection
// //             );
// //           }
// //         } else if (selectedTitle === "vendorId") {
// //           const vendors = await vendorModal.find({
// //             $or: [
// //               { firstName: { $regex: inputValue, $options: "i" } },
// //               { email: { $regex: inputValue, $options: "i" } },
// //             ],
// //           });
// //           if (vendors) {
// //             const vendorIds = vendors.map((v) => v._id);
// //             addConditionToQuery(
// //               query,
// //               { vendorId: { $in: vendorIds } },
// //               radioSelection
// //             );
// //           }
// //         } else if (selectedTitle === "name") {
// //           addConditionToQuery(
// //             query,
// //             { name: { $regex: inputValue, $options: "i" } },
// //             radioSelection
// //           );
// //         } else if (selectedTitle === "tags") {
// //           const tagsQuery = getTagsQuery(condition, inputValue);
// //           addConditionToQuery(query, tagsQuery, radioSelection);
// //         } else {
// //           const varientsQuery = await getVarientsDetailsQuery(
// //             condition,
// //             selectedTitle,
// //             inputValue,
// //             operator
// //           );
// //           const varientsDetails = await VarientsDetails.find(varientsQuery);
// //           if (varientsDetails) {
// //             const pvids = varientsDetails.map((v) => v.pvid);
// //             const productVarients = await productVarients2.find({
// //               _id: { $in: pvids },
// //             });
// //             const productIds = productVarients.map((pv) => pv.pid);
// //             addConditionToQuery(
// //               query,
// //               { _id: { $in: productIds } },
// //               radioSelection
// //             );
// //           }
// //         }
// //       }
// //     }

// //     const someMoreProducts = await productModal.find(query);
// //     filteredProducts = [...someMoreProducts];
// //     const uniqueFilteredProducts = Array.from(
// //       new Map(
// //         filteredProducts.map((product) => [product._id.toString(), product])
// //       ).values()
// //     );

// //     console.log("Finally all filtered ", filteredProducts);
// //     console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
// //     res.json(uniqueFilteredProducts);
// //   } catch (error) {
// //     console.error("Error occurred while filtering products", error);
// //     res.status(400).json({ error: "something went wrong" });
// //   }
// // };

// import conditionValueModal from "../schema/conditionValueModal.js";
// import categoriesModal from "../schema/categoriesModal.js";
// import vendorModal from "../schema/vendorModal.js";
// import productModal from "../schema/product.js";
// import productVarients2 from "../schema/productVarients2.js";
// import VarientsDetails from "../schema/productVarientsDetails.js";
// import { getOperator } from "../utils/index.js";
// import Collection from "../schema/collectionModal.js";
// const addConditionToQuery = (query, condition, radioSelection) => {
//   if (radioSelection === "all") {
//     query.$and.push(condition);
//   } else {
//     query.$or.push(condition);
//   }
// };

// const buildPriceQuery = (condition, inputValue, operator) => {
//   const priceValue = parseFloat(inputValue);
//   return { price: { [operator]: priceValue } };
// };

// const buildQuantityQuery = (condition, inputValue, operator) => {
//   const quantityValue = parseFloat(inputValue);
//   if (operator === "$ne") {
//     return { quantity: { $not: { $eq: quantityValue } } };
//   }
//   return { quantity: { [operator]: quantityValue } };
// };

// const getTagsQuery = (condition, inputValue) => {
//   let tagsQuery = {};

//   switch (condition.conditionValue) {
//     case "contains":
//       tagsQuery = { tags: { $regex: inputValue, $options: "i" } };
//       break;
//     case "does not contain":
//       tagsQuery = { tags: { $not: { $regex: inputValue, $options: "i" } } };
//       break;
//     case "start with":
//       tagsQuery = { tags: { $regex: `^${inputValue}`, $options: "i" } };
//       break;
//     case "end with":
//       tagsQuery = { tags: { $regex: `${inputValue}$`, $options: "i" } };
//       break;
//     default:
//       break;
//   }

//   return tagsQuery;
// };

// const getVarientsDetailsQuery = async (
//   condition,
//   selectedTitle,
//   inputValue,
//   operator
// ) => {
//   let query;
//   if (selectedTitle === "price") {
//     query = buildPriceQuery(condition, inputValue, operator);
//   } else if (selectedTitle === "quantity") {
//     query = buildQuantityQuery(condition, inputValue, operator);
//   } else if (selectedTitle === "tags") {
//     query = getTagsQuery(condition, inputValue);
//   }
//   return query;
// };

// export const getRawDataForFilter = async (req, res) => {
//   try {
//     const conditionsArray = req.body.changedTitleFilterArr;
//     const radioSelection = req.body.radioSelection;
//     console.log("conditionsArray ", conditionsArray);
//     let filteredProducts = [];
//     let query;
//     if (radioSelection === "all") {
//       query = {
//         $and: [],
//       };
//     } else {
//       query = {
//         $or: [],
//       };
//     }

//     for (const condition of conditionsArray) {
//       let { selectedTitle, conditionValue, inputValue } = condition;
//       let actualConditionValue;
//       if (conditionValue == "string") {
//         actualConditionValue = await conditionValueModal.find({
//           conditionValue: conditionValue,
//         });
//       } else {
//         actualConditionValue = await conditionValueModal.find({
//           _id: conditionValue,
//         });
//       }

//       if (actualConditionValue) {
//         condition.conditionValue = actualConditionValue[0].conditionValue;
//         const operator = getOperator(condition.conditionValue);
//         console.log("operator ", operator);

//         switch (selectedTitle) {
//           case "category":
//             const categories = await categoriesModal.find({
//               name: { $regex: inputValue, $options: "i" },
//             });
//             if (categories && categories.length > 0) {
//               const categoryIds = categories.map((c) => c._id);
//               const categoryCondition =
//                 operator === "$ne"
//                   ? { categoryId: { $nin: categoryIds } }
//                   : { categoryId: { $in: categoryIds } };
//               addConditionToQuery(query, categoryCondition, radioSelection);
//             }
//             break;
//           case "vendorId":
//             const vendors = await vendorModal.find({
//               $or: [
//                 { firstName: { $regex: inputValue, $options: "i" } },
//                 { email: { $regex: inputValue, $options: "i" } },
//               ],
//             });
//             if (vendors && vendors.length > 0) {
//               const vendorIds = vendors.map((v) => v._id);
//               const vendorCondition =
//                 operator === "$ne"
//                   ? { vendorId: { $nin: vendorIds } }
//                   : { vendorId: { $in: vendorIds } };
//               addConditionToQuery(query, vendorCondition, radioSelection);
//             }
//             break;
//           case "name":
//             const nameCondition = {};
//             switch (condition.conditionValue) {
//               case "contains":
//                 nameCondition.name = { $regex: inputValue, $options: "i" };
//                 break;
//               case "does not contain":
//                 nameCondition.name = {
//                   $not: { $regex: inputValue, $options: "i" },
//                 };
//                 break;
//               case "start with":
//                 nameCondition.name = {
//                   $regex: `^${inputValue}`,
//                   $options: "i",
//                 };
//                 break;
//               case "end with":
//                 nameCondition.name = {
//                   $regex: `${inputValue}$`,
//                   $options: "i",
//                 };
//                 break;
//               default:
//                 break;
//             }
//             addConditionToQuery(query, nameCondition, radioSelection);
//             break;
//           case "tags":
//             const tagsQuery = getTagsQuery(condition, inputValue);
//             addConditionToQuery(query, tagsQuery, radioSelection);
//             break;
//           default:
//             const varientsQuery = await getVarientsDetailsQuery(
//               condition,
//               selectedTitle,
//               inputValue,
//               operator
//             );
//             const varientsDetails = await VarientsDetails.find(varientsQuery);
//             if (varientsDetails) {
//               const pvids = varientsDetails.map((v) => v.pvid);
//               const productVarients = await productVarients2.find({
//                 _id: { $in: pvids },
//               });
//               const productIds = productVarients.map((pv) => pv.pid);
//               const productIdsCondition =
//                 operator === "$ne"
//                   ? { _id: { $nin: productIds } }
//                   : { _id: { $in: productIds } };
//               addConditionToQuery(query, productIdsCondition, radioSelection);
//             }
//             break;
//         }
//       }
//     }

//     const someMoreProducts = await productModal.find(query);
//     filteredProducts = [...someMoreProducts];
//     const uniqueFilteredProducts = Array.from(
//       new Map(
//         filteredProducts.map((product) => [product._id.toString(), product])
//       ).values()
//     );

//     console.log("Finally all filtered ", filteredProducts);
//     console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
//     res.json(uniqueFilteredProducts);
//   } catch (error) {
//     console.error("Error occurred while filtering products", error);
//     res.status(400).json({ error: "something went wrong" });
//   }
// };

// export const createCollection = async (req, res) => {
//   try {
//     console.log("REQUEST BODY: ", req.body);
//     const collection = new Collection(req.body);
//     await collection.save();
//     res.status(201).json(collection);
//   } catch (error) {
//     console.log("error in createCollection controller ", error);
//     res
//       .status(400)
//       .json({ error: "Failed to create collection", message: error.message });
//   }
// };

// export const getAllCollections = async (req, res) => {
//   try {
//     const collections = await Collection.find().sort({ createdAt: -1 });
//     res.status(200).json(collections);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to retrieve collections" });
//   }
// };

// export const getCollectionById = async (req, res) => {
//   try {
//     console.log("req.parmsfnbs ",req.params.id);
//     const collection = await Collection.findById(req.params.id.substring(1));
//     console.log("collection ",collection);
//     if (!collection) {
//       return res.status(404).json({ error: "Collection not found" });
//     }
//     res.status(200).json(collection);
//   } catch (error) {
//     console.log("Error in getCollectionById ", error);
//     res.status(400).json({ error: "Failed to retrieve collection" });
//   }
// };

// export const deleteCollectionById = async (req, res) => {
//   try {
//     console.log("req.params.id is ");
//     console.log(req.params.id);
//     const collection = await Collection.findByIdAndDelete(
//       req.params.id.substring(1)
//     );

//     if (!collection) {
//       return res.status(404).json({ error: "Collection not found" });
//     }
//     res.status(200).json({ message: "Collection deleted successfully" });
//   } catch (error) {
//     console.log("Error in deleteCollectionById", error);
//     res.status(400).json({ error: "Failed to delete collection" });
//   }
// };

// import conditionValueModal from "../schema/conditionValueModal.js";
// import categoriesModal from "../schema/categoriesModal.js";
// import vendorModal from "../schema/vendorModal.js";
// import productModal from "../schema/product.js";
// import productVarients2 from "../schema/productVarients2.js";
// import VarientsDetails from "../schema/productVarientsDetails.js";
// import { getOperator } from "../utils/index.js";

// const addConditionToQuery = (query, condition, radioSelection) => {
//   if (radioSelection == "all") {
//     query.$and.push(condition);
//   } else {
//     query.$or.push(condition);
//   }
// };

// export const getRawDataForFilter = async (req, res) => {
//   try {
//     const conditionsArray = req.body.changedTitleFilterArr;
//     const radioSelection = req.body.radioSelection;
//     console.log("conditionsArray ", conditionsArray);
//     let filteredProducts = [];
//     let query;
//     if (radioSelection == "all") {
//       query = {
//         $and: [],
//       };
//     } else {
//       query = {
//         $or: [],
//       };
//     }

//     for (const condition of conditionsArray) {
//       let { selectedTitle, conditionValue, inputValue } = condition;

//       const actualConditionValue = await conditionValueModal.find({
//         _id: conditionValue,
//       });

//       if (actualConditionValue) {
//         condition.conditionValue = actualConditionValue[0].conditionValue;
//         const operator = getOperator(condition.conditionValue);
//         console.log("operator ", operator);
//         let categories;
//         if (selectedTitle == "category") {
//           categories = await categoriesModal.find({
//             name: { $regex: inputValue, $options: "i" },
//           });
//           if (categories) {
//             const categoryIds = categories.map((c) => c._id);

//             filteredProducts = await productModal.find({
//               categoryId: { $in: categoryIds },
//             });
//           }
//         }

//         let vendors;
//         if (selectedTitle === "vendorId") {
//           vendors = await vendorModal.find({
//             $or: [
//               { firstName: { $regex: inputValue, $options: "i" } },
//               { email: { $regex: inputValue, $options: "i" } },
//             ],
//           });
//           const vendorIds = vendors.map((vendor) => {
//             vendor._id;
//             condition.inputValue = vendor._id;
//           });
//           if (condition.conditionValue === "equal") {
//             filteredProducts = await productModal.find({
//               vendorId: { $in: vendorIds },
//             });
//           } else if (condition.conditionValue === "not equal") {
//             filteredProducts = await productModal.find({
//               vendorId: { $nin: vendorIds },
//             });
//           }
//           // res.json(filteredProducts);
//           // return;
//         }

//         let productByName;
//         if (selectedTitle === "Name") {
//           productByName = await productModal.find({
//             name: { $regex: inputValue, $options: "i" },
//           });
//           console.log("productByName ", productByName);
//           if (productByName) {
//             const productIds = productByName.map((p) => p._id);
//             filteredProducts = await productModal.find({
//               categoryId: { $in: productIds },
//             });
//           }
//         }

//         let productByPrice, priceQuery;
//         if (selectedTitle === "price") {
//           const priceValue = parseFloat(inputValue);
//           switch (condition.conditionValue) {
//             case "equal":
//               priceQuery = { price: { $eq: priceValue } };
//               break;
//             case "not equal":
//               priceQuery = { price: { $ne: priceValue } };
//               break;
//             case "greater than":
//               priceQuery = { price: { $gt: priceValue } };
//               break;
//             case "less than":
//               priceQuery = { price: { $lt: priceValue } };
//               break;
//             default:
//               break;
//           }
//           productByPrice = await VarientsDetails.find(priceQuery);
//           console.log("productByPrice ", productByPrice);
//           if (productByPrice) {
//             const vid = productByPrice.map((pp) => pp.pvid);
//             let id2 = await productVarients2.find({
//               _id: { $in: vid },
//             });
//             let productId = id2.map((pp) => pp.pid);
//             if (productId) {
//               filteredProducts = await productModal.find({
//                 _id: { $in: productId },
//               });
//             }
//           }
//         }

//         let varientByQuantity , quantityQuery;;
//         if (selectedTitle === "quantity") {
//           const quantityeValue = parseFloat(inputValue);

//           switch (condition.conditionValue) {
//             case "equal":
//               quantityQuery = { quantity: { $eq: quantityeValue } };
//               break;
//             case "not equal":
//               quantityQuery = { quantity: { $ne: quantityeValue } };
//               break;
//             case "greater than":
//               quantityQuery = { quantity: { $gt: quantityeValue } };
//               break;
//             case "less than":
//               quantityQuery = { quantity: { $lt: quantityeValue } };
//               break;
//             default:
//               break;
//           }
//           varientByQuantity = await VarientsDetails.find(quantityQuery);
//           console.log("varientByQuantity ", varientByQuantity);
//           if (varientByQuantity) {
//             const vid = varientByQuantity.map((pp) => pp.pvid);
//             let id2 = await productVarients2.find({
//               _id: { $in: vid },
//             });
//             let productId = id2.map((pp) => pp.pid);
//             if (productId) {
//               filteredProducts = await productModal.find({
//                 _id: { $in: productId },
//               });
//             }
//           }
//         }

//         if (condition.conditionValue === "equal") {
//           inputValue = new RegExp(`^${inputValue}$`, "i");
//         } else if (condition.conditionValue === "not equal") {
//           inputValue = new RegExp(`^(?!${inputValue}$).*`, "i");
//         } else if (condition.conditionValue == "start with") {
//           inputValue = new RegExp(`^${inputValue}`, "i");
//         } else if (condition.conditionValue === "end with") {
//           inputValue = new RegExp(`${inputValue}$`, "gi");
//         } else if (condition.conditionValue === "contains") {
//           console.log("Inside else if contains");
//           inputValue = new RegExp(inputValue, "gi");
//         } else if (condition.conditionValue === "does not contain") {
//           inputValue = new RegExp(inputValue, "gi");
//         }

//         let conditionQuery;
//         if (selectedTitle == "vendorId") {
//           conditionQuery = {
//             [selectedTitle]: { [operator]: condition.inputValue.toString() },
//           };
//         } else {
//           conditionQuery = {
//             [selectedTitle]: { [operator]: inputValue },
//           };
//         }
//         if (radioSelection == "all") {
//           query.$and.push(conditionQuery);
//         } else {
//           query.$or.push(conditionQuery);
//         }
//       }
//     }

//     const someMoreProducts = await productModal.find(query);
//     filteredProducts = [...someMoreProducts, ...filteredProducts];
//     const uniqueFilteredProducts = Array.from(
//       new Map(
//         filteredProducts.map((product) => [product._id.toString(), product])
//       ).values()
//     );
//     console.log("Finally all filtered ", filteredProducts);
//     console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
//     res.json(uniqueFilteredProducts);
//   } catch (error) {
//     console.error("Error occurred while filtering products", error);
//     res.status(400).json({ error: "somthing went wrong" });
//   }
// };

// import conditionValueModal from "../schema/conditionValueModal.js";
// import categoriesModal from "../schema/categoriesModal.js";
// import vendorModal from "../schema/vendorModal.js";
// import productModal from "../schema/product.js";
// import productVarients2 from "../schema/productVarients2.js";
// import VarientsDetails from "../schema/productVarientsDetails.js";
// import { getOperator } from "../utils/index.js";

// const addConditionToQuery = (query, condition, radioSelection) => {
//   if (radioSelection === "all") {
//     query.$and.push(condition);
//   } else {
//     query.$or.push(condition);
//   }
// };

// const buildPriceQuery = (condition, inputValue, operator) => {
//   const priceValue = parseFloat(inputValue);
//   return { price: { [operator]: priceValue } };
// };

// const buildQuantityQuery = (condition, inputValue, operator) => {
//   const quantityValue = parseFloat(inputValue);
//   return { quantity: { [operator]: quantityValue } };
// };

// const getTagsQuery = (condition, inputValue) => {
//   let tagsQuery = {};

//   switch (condition.conditionValue) {
//     case "contains":
//       tagsQuery = { tags: { $regex: inputValue, $options: "i" } };
//       break;
//     case "does not contain":
//       tagsQuery = { tags: { $not: { $regex: inputValue, $options: "i" } } };
//       break;
//     case "start with":
//       tagsQuery = { tags: { $regex: `^${inputValue}`, $options: "i" } };
//       break;
//     case "end with":
//       tagsQuery = { tags: { $regex: `${inputValue}$`, $options: "i" } };
//       break;
//     default:
//       break;
//   }

//   return tagsQuery;
// };

// const getVarientsDetailsQuery = async (
//   condition,
//   selectedTitle,
//   inputValue,
//   operator
// ) => {
//   let query;
//   if (selectedTitle === "price") {
//     query = buildPriceQuery(condition, inputValue, operator);
//   } else if (selectedTitle === "quantity") {
//     query = buildQuantityQuery(condition, inputValue, operator);
//   } else if (selectedTitle === "tags") {
//     query = getTagsQuery(condition, inputValue);
//   }
//   return query;
// };

// export const getRawDataForFilter = async (req, res) => {
//   try {
//     const conditionsArray = req.body.changedTitleFilterArr;
//     const radioSelection = req.body.radioSelection;
//     console.log("conditionsArray ", conditionsArray);
//     let filteredProducts = [];
//     let query;
//     if (radioSelection === "all") {
//       query = {
//         $and: [],
//       };
//     } else {
//       query = {
//         $or: [],
//       };
//     }

//     for (const condition of conditionsArray) {
//       let { selectedTitle, conditionValue, inputValue } = condition;

//       const actualConditionValue = await conditionValueModal.find({
//         _id: conditionValue,
//       });

//       if (actualConditionValue) {
//         condition.conditionValue = actualConditionValue[0].conditionValue;
//         const operator = getOperator(condition.conditionValue);
//         console.log("operator ", operator);

//         if (selectedTitle === "category") {
//           const categories = await categoriesModal.find({
//             name: { $regex: inputValue, $options: "i" },
//           });
//           if (categories) {
//             const categoryIds = categories.map((c) => c._id);
//             addConditionToQuery(
//               query,
//               { categoryId: { $in: categoryIds } },
//               radioSelection
//             );
//           }
//         } else if (selectedTitle === "vendorId") {
//           const vendors = await vendorModal.find({
//             $or: [
//               { firstName: { $regex: inputValue, $options: "i" } },
//               { email: { $regex: inputValue, $options: "i" } },
//             ],
//           });
//           if (vendors) {
//             const vendorIds = vendors.map((v) => v._id);
//             addConditionToQuery(
//               query,
//               { vendorId: { $in: vendorIds } },
//               radioSelection
//             );
//           }
//         } else if (selectedTitle === "name") {
//           addConditionToQuery(
//             query,
//             { name: { $regex: inputValue, $options: "i" } },
//             radioSelection
//           );
//         } else if (selectedTitle === "tags") {
//           const tagsQuery = getTagsQuery(condition, inputValue);
//           addConditionToQuery(query, tagsQuery, radioSelection);
//         } else {
//           const varientsQuery = await getVarientsDetailsQuery(
//             condition,
//             selectedTitle,
//             inputValue,
//             operator
//           );
//           const varientsDetails = await VarientsDetails.find(varientsQuery);
//           if (varientsDetails) {
//             const pvids = varientsDetails.map((v) => v.pvid);
//             const productVarients = await productVarients2.find({
//               _id: { $in: pvids },
//             });
//             const productIds = productVarients.map((pv) => pv.pid);
//             addConditionToQuery(
//               query,
//               { _id: { $in: productIds } },
//               radioSelection
//             );
//           }
//         }
//       }
//     }

//     const someMoreProducts = await productModal.find(query);
//     filteredProducts = [...someMoreProducts];
//     const uniqueFilteredProducts = Array.from(
//       new Map(
//         filteredProducts.map((product) => [product._id.toString(), product])
//       ).values()
//     );

//     console.log("Finally all filtered ", filteredProducts);
//     console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
//     res.json(uniqueFilteredProducts);
//   } catch (error) {
//     console.error("Error occurred while filtering products", error);
//     res.status(400).json({ error: "something went wrong" });
//   }
// };

import conditionValueModal from "../schema/conditionValueModal.js";
import categoriesModal from "../schema/categoriesModal.js";
import vendorModal from "../schema/vendorModal.js";
import productModal from "../schema/product.js";
import productVarients2 from "../schema/productVarients2.js";
import VarientsDetails from "../schema/productVarientsDetails.js";
import { getOperator } from "../utils/index.js";
import Collection from "../schema/collectionModal.js";
import mongoose, { Mongoose } from "mongoose";

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
    console.log("req.body is ", req.body);
    const conditionsArray = req.body.changedTitleFilterArr;
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
          case "vendorId":
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
    console.log("collection at the timeof insert ", collection);
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

// export const updateCollection = async (req, res) => {
//   const {
//     inputValue,
//     title,
//     description,
//     diactiveProductId,
//     status,
//     radioSelection,
//     collectionConditionId,
//   } = req.body;
//   let conditionValue = req.body.conditionValue;
//   console.log("req.bodu ", req.body);
//   try {
//     let collectionToUpdate;
//     if (!mongoose.Types.ObjectId.isValid(conditionValue)) {
//       console.log("Inside if");
//       collectionToUpdate = await conditionValueModal.findOne({
//         conditionValue: conditionValue,
//       });
//       conditionValue = collectionToUpdate._id;
//     }
//     console.log("collectionToUpdate ", collectionToUpdate);

//     if (!collectionToUpdate) {
//       return res.status(404).json({ error: "Collection not found" });
//     }
//     let idToFind = req.body._id;
//     console.log("conditionValue ", conditionValue);
//     const updatedCollection = await Collection.findByIdAndUpdate(
//       idToFind,
//       {
//         collectionConditionId,
//         conditionValue: conditionValue,
//         inputValue,
//         title,
//         description,
//         diactiveProductId,
//         status,
//         updatedAt: Date.now(),
//       },
//       // updateData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedCollection) {
//       return res.status(404).json({ error: "Failed to update collection" });
//     }

//     console.log("updatedCollection ", updatedCollection);
//     res.status(200).json(updatedCollection);
//   } catch (error) {
//     console.log("Error in updateCollection controller", error);
//     res
//       .status(400)
//       .json({ error: "Failed to update collection", message: error.message });
//   }
// };


export const updateCollection = async (req, res) => {
  const {
    _id,
    inputValue,
    title,
    description,
    diactiveProductId,
    status,
    radioSelection,
    collectionConditionId,
    conditionValue,
  } = req.body;

  try {
    let idToUpdate = _id; // Assuming _id is directly available in req.body

    // Check if conditionValue is an array of valid ObjectId strings
    let updatedConditionValues = [];
    for (let value of conditionValue) {
      if (mongoose.Types.ObjectId.isValid(value)) {
        updatedConditionValues.push(value);
      } else {
        // Find the document in conditionValueModal based on value
        const conditionDoc = await conditionValueModal.findOne({
          conditionValue: value,
        });

        if (!conditionDoc) {
          return res
            .status(404)
            .json({ error: `Condition document not found for value ${value}` });
        }

        // Push the _id of the found document
        updatedConditionValues.push(conditionDoc._id);
      }
    }
console.log("updatedConditionValues ", updatedConditionValues);

    // Update the collection document
    const updatedCollection = await Collection.findByIdAndUpdate(
      idToUpdate,
      {
        collectionConditionId,
        conditionValue: updatedConditionValues,
        inputValue,
        title,
        description,
        diactiveProductId,
        status,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    console.log("updatedCollection ", updatedCollection);
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
