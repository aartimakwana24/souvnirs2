// import mongoose from "mongoose";

// const initialConditions = [
//   { conditionValue: "greaterThan" },
//   { conditionValue: "lessThan" },
//   { conditionValue: "equal" },
//   { conditionValue: "contains" },
//   { conditionValue: "does not contains" },
//   { conditionValue: "end with" },
//   { conditionValue: "start with" },
//   { conditionValue: "not equal" },
// ];

// const ConditionValueSchema = new mongoose.Schema({
//   conditionValue: {
//     type: String,
//     required: true,
//     default: initialConditions,
//   },
// });

// export default mongoose.model(
//   "ConditionValue",
//   ConditionValueSchema,
//   "ConditionValue"
// );


import mongoose from "mongoose";

const ConditionValueSchema = new mongoose.Schema({
  conditionValue: {
    type: String,
    required: true,
  },
});

export default mongoose.model(
  "ConditionValue",
  ConditionValueSchema,
  "ConditionValue"
);
