const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    offer = new Offer({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      seller: req.user
    });

    offer.save();
    res.json(offer.populate("user"));
  } catch (error) {
    res.json(error.message);
  }
});

const offerFilter = req => {
  const filter = {};

  if (req.query.priceMin) {
    filter.price = {};
    filter.price.$gt = req.query.priceMin;
  }

  if (req.query.priceMax) {
    if (filter.price === undefined) {
      filter.price = {};
    }
    filter.price.$lt = req.query.priceMax;
  }

  if (req.query.title) {
    filter.title = new RegExp(req.query.title, "i");
  }

  return filter;
};

router.get("/offer/with-count", async (req, res) => {
  try {
    const search = Offer.find(offerFilter(req));
    console.log(req.query.priceMin);
    if (req.query.sort) {
      switch (req.query.sort) {
        case "price-desc":
          search.sort({ price: -1 });
          break;
        case "price-asc":
          search.sort({ price: 1 });
          break;
        case "date-desc":
          search.sort({ date: -1 });
          break;
        case "date-asc":
          search.sort({ date: 1 });
          break;
      }
    }

    if (req.query.page) {
      const limit = 5;
      search.skip(limit * (req.query.page - 1)).limit(limit);
    }

    const offers = await search;

    res.json(offers);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
