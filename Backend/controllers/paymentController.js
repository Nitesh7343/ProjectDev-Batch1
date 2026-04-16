import Payment from "../models/Payment.js";

export const makePayment = async (req, res) => {
  const { reservationId, amount } = req.body;

  const payment = await Payment.create({
    reservation: reservationId,
    amount,
    status: "SUCCESS",
  });

  res.json(payment);
};