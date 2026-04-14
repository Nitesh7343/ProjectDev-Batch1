import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSlot" },
  startTime: Date,
  endTime: Date,
  status: {
    type: String,
    enum: ["BOOKED", "ACTIVE", "COMPLETED", "CANCELLED"],
    default: "BOOKED",
  },
});

export default mongoose.model("Reservation", reservationSchema);