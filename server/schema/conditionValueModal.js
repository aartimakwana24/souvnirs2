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
