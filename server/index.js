const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const auth = require("./routes/auth");
const depositMiddleware = require("./middlewares/depositMiddleware");
const loanMiddleware = require("./middlewares/loanMiddleware");
const savingsMiddleware = require("./middlewares/savingsMiddleware");
const withdrawalMiddleware = require("./middlewares/withdrawalMiddleware");
//const Deposit = require("./models/depositModel");
const Transaction = require("./routes/transactionRoute");
const Virtual = require("./middlewares/virtual");
const loanValue = require("./middlewares/loanValue");
const cryptoMiddleware = require("./middlewares/cryptoMiddleware");
const headerContentRoutes = require("./routes/header");
const footerContentRoutes = require("./routes/footer");

// Set up multer for handling file uploads
const upload = multer(); // Specify the directory to store uploaded files

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://finflow.netlify.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, auth-token");
  next();
}); */
app.use(express.json({ limit: "10mb" }));
const PORT = 4000;

const mongo = process.env.MONGODB_URL;

mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connection successful"))
  .catch(() => console.log("Mongo connection failed"));

app.use("/", depositMiddleware);
app.use("/", auth);
app.use("/", Virtual);
app.use("/", Transaction);
app.use("/", loanMiddleware);
app.use("/", savingsMiddleware);
app.use("/", loanValue);
app.use("/", withdrawalMiddleware);
app.use("/", cryptoMiddleware);
app.use("/", headerContentRoutes);
app.use("/", footerContentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
