const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
// bearers start
const passport = require("passport");

// bearer end
const app = express();
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.listen(3000, () => console.log("Server started"));
