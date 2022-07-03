"use strict";

const express = require("express");
const Advert = require("../../models/Advert");
const router = express.Router();

//GET /api/adverts

router.get("/advert", async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({ result: adverts });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
