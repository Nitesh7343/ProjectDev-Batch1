import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
  },
  code: String,
  isValid: { type: Boolean, default: true },
  expiryTime: Date,
});

export default mongoose.model("QRCode", qrSchema);