import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
  },
  amount: Number,
  status: { type: String, default: "PENDING" },
});

export default mongoose.model("Payment", paymentSchema);