import QRCodeModel from "../models/QRCode.js";
import { generateQR } from "../utils/generateQR.js";

export const createQR = async (req, res) => {
  const { reservationId } = req.body;

  const qrData = generateQR(reservationId);

  const qr = await QRCodeModel.create({
    reservation: reservationId,
    code: qrData,
    expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });

  res.json(qr);
};

export const scanQR = async (req, res) => {
  const { code } = req.body;

  const qr = await QRCodeModel.findOne({ code });

  if (!qr || !qr.isValid)
    return res.status(400).json({ msg: "Invalid QR" });

  if (new Date() > qr.expiryTime)
    return res.status(400).json({ msg: "QR Expired" });

  res.json({ msg: "Access Granted" });
};

export const invalidateQR = async (req, res) => {
  const { code } = req.body;

  await QRCodeModel.findOneAndUpdate(
    { code },
    { isValid: false }
  );

  res.json({ msg: "QR invalidated" });
};