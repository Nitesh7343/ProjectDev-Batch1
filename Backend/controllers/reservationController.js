import Reservation from "../models/Reservation.js";
import ParkingSlot from "../models/ParkingSlot.js";

export const createReservation = async (req, res) => {
  const { slotId, startTime, endTime } = req.body;

  const slot = await ParkingSlot.findById(slotId);
  if (slot.status !== "AVAILABLE")
    return res.status(400).json({ msg: "Slot not available" });

  slot.status = "RESERVED";
  await slot.save();

  const reservation = await Reservation.create({
    user: req.user,
    slot: slotId,
    startTime,
    endTime,
  });

  res.json(reservation);
};