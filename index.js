const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
require("dotenv").config();
const app = express();
app.use(formidableMiddleware());
console.log(process.env.MONGODB_URI, "bonjour");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(userRoutes);
app.use(offerRoutes);
app.listen(process.env.PORT, () => console.log("Server started"));
