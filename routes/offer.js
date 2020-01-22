const express = require("express");
const router = express.Router();
const User = require("../models/User");

router("/offer/publish", async (req, res) => {
  try {
    offer = new Offer({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      seller: "   "
    });
  } catch (error) {}
});
