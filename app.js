require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// MongoDB Connection
const connectDB = require("./config/db");
connectDB();

// Essential Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Using EJS
app.set("view engine", "ejs");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Using compression
app.use(compression());
// Static files path
app.use(express.static(__dirname + "/public"));

// Cookies and session middlewares
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: oneDay },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    })
  })
);

// API Endpoints
app.use("/api/v1/auth", require("./routes/auth"));

// View Endpoints
app.use("/", require("./routes/views.js"));

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port PORT ${PORT}`);
});
