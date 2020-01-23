const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");

const app = express();
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/leBonCoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(userRoutes);
app.use(offerRoutes);
app.listen(3000, () => console.log("Server started"));
