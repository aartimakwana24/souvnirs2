import conditionValueModal from "../schema/conditionValueModal.js";
import collectionConditionsModal from "../schema/collectionConditionsModal.js";
import mongoose from "mongoose";

const initialConditions = [
  { conditionValue: "greaterThan" },
  { conditionValue: "lessThan" },
  { conditionValue: "equal" },
  { conditionValue: "contains" },
  { conditionValue: "does not contain" },
  { conditionValue: "ends with" },
  { conditionValue: "starts with" },
  { conditionValue: "not equal" },
];

async function insertInitialData() {
  try {
    const count = await conditionValueModal.countDocuments();
    if (count === 0) {
      await conditionValueModal.insertMany(initialConditions);
    }
  } catch (error) {
    console.error("Error inserting initial data:", error);
  } 
}
insertInitialData();

export const getAllConditionValues = async (req, res) => {
  try {
    const conditionValues = await conditionValueModal.find();
    res.json(conditionValues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createCollectionCondition = async (req, res) => {
  try {
    console.log("req.body in create ",req.body);
    const collectionCondition = new collectionConditionsModal(req.body);
    await collectionCondition.save();
    res.status(201).json(collectionCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCollectionConditions = async (req, res) => {
  try {
    const collectionConditions = await collectionConditionsModal.aggregate([
      {
        $lookup: {
          from: "ConditionValue",
          localField: "conditionValues",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $project: {
          "result.conditionValue": 1,
          title: 1,
          status: 1,
        },
      },
    ]);
    res.status(200).json(collectionConditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const updateCollectionConditionById = async (req, res) => {
//   try {
//     console.log(
//       "req.params.id in updateCollectionConditionById",
//       req.params.id
//     );
//     const existingCC = await collectionConditionsModal.findById(
//       req.params.id.substring(1)
//     );
//     console.log("existingCC ", existingCC);
//     if (!existingCC) {
//       return res.status(404).json({ error: "CollectionCondition not found" });
//     }
//     const { title, status, conditionValues } = req.body;
//     console.log("req.body ",req.body);
//     existingCC.title = title ?? existingCC.title;
//     // existingCC.status = status ?? existingCC.status;
//     let upCV = conditionValues.map((val) => mongoose.Types.ObjectId(val.value));
//     console.log("upCV ", upCV);
//     existingCC.conditionValues = upCV;
//     console.log("Updated ", existingCC);
//     const updatedCC = await existingCC.save();
//     console.log("fimally updations ",updatedCC);
//     res.status(200).json(updatedCC);
//   } catch (error) {
//     console.log("Error in updateCollectionConditionById ",error);
//     res.status(400).json({ error: error.message });
//   }
// };


export const updateCollectionConditionById = async (req, res) => {
  try {
    const existingCC = await collectionConditionsModal.findById(req.params.id.substring(1));
    if (!existingCC) {
      return res.status(404).json({ error: "CollectionCondition not found" });
    }
    const { title, status, conditionValues } = req.body;
    console.log("req.body updateCollectionConditionById", req.body);
    
   
    if (title) {
      existingCC.title = title;
    }
    if (status) {
      existingCC.status = status;
    }


    // Convert conditionValues to ObjectId
    let upCV = conditionValues.map((val) => val.id);
    // console.log("upCV ", upCV);
    existingCC.conditionValues = upCV;

    const updatedCC = await existingCC.save();
    console.log("Finally updated ", updatedCC);

    res.status(200).json(updatedCC);
  } catch (error) {
    console.log("Error in updateCollectionConditionById ", error);
    res.status(400).json({ error: error.message });
  }
};

export const getCollectionConditionById = async (req, res) => {
  try {
    console.log(" req.params.id in getCollectionConditionById", req.params.id);
    const collectionCondition = await collectionConditionsModal.findById(
      req.params.id.substring(1)
    );
    if (!collectionCondition) {
      return res.status(404).json({ error: "CollectionCondition not found" });
    }
    res.json(collectionCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCollectionCondition = async (req, res) => {
  try {
    const collectionCondition =
      await collectionConditionsModal.findByIdAndDelete(
        req.params.id
      );
    if (!collectionCondition) {
      return res.status(404).json({ error: "CollectionCondition not found" });
    }
    res.json({ message: "CollectionCondition deleted successfully" });
  } catch (error) {
    console.log(
      "Error in deleteCollectionCondition ",
      error
    );
    res.status(400).json({ error: error.message });
  }
};