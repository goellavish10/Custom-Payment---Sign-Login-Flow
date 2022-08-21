require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// MongoDB Connection
const connectDB = require("./config/db");
connectDB();

// Essential Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// API Endpoints
app.use("/api/v1/auth", require("./routes/auth"));

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port PORT ${PORT}`);
});
