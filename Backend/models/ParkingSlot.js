import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  slotNumber: String,
  status: {
    type: String,
    enum: ["AVAILABLE", "RESERVED", "OCCUPIED"],
    default: "AVAILABLE",
  },
});

export default mongoose.model("ParkingSlot", slotSchema);