const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Offer;
