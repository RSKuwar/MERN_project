require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactions");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
