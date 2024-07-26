import mongoose from "mongoose";
async function connect() {
  try {
    // await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connect("mongodb://127.0.0.1:27017/souvnirs2");
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
export default connect;
