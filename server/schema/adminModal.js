                        
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);


/*
db.Admin.insertOne({
  email:"admin@gmail.com",
  password:"Admin@123"
  firstName:"admin",
  lastName:"admin"
});
*/

export default mongoose.model("adminSchema", adminSchema, "Admin");
