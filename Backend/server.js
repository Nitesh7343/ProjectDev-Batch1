import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoute from "./routes/authRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(5000, () => console.log("Server running"));