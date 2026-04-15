import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  vehicle_no: String,
  location: String
});

export default mongoose.model("User", userSchema);