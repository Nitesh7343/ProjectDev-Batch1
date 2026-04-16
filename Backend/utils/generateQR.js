import crypto from "crypto";

export const generateQR = (reservationId) => {
  return crypto
    .createHash("sha256")
    .update(reservationId + Date.now())
    .digest("hex");
};