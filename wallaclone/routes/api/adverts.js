//"use strict";

const express = require("express");
const Advert = require("../../models/Advert");
const router = express.Router();

//Traer todos los anuncios
router.get("/", async (req, res, next) => {
  try {
    const tags = req.query.tags;
    const price = req.query.price;
    const name = req.query.name;
    const sale = req.query.sale;

    // Pagination
    const skip = req.query.limit;

    // Limits the amount
    const limit = req.query.limit;

    //Fields to show
    const select = req.query.select;

    //Field to sort
    const sort = req.query.sort;

    // Obj filtros
    const filtros = {};

    //  filtro por nombres
    if (typeof name !== "undefined") {
      filtros.name = new RegExp("\\b" + name + "\\b", "i");
    }

    // filter price
    if (typeof price !== "undefined" && price !== "-") {
      if (price.indexOf("-") !== -1) {
        filtros.price = {};
        let rango = price.split("-");
        if (rango[0] !== "") {
          filtros.price.$gte = rango[0];
        }

        if (rango[1] !== "") {
          filtros.price.$lte = rango[1];
        }
      } else {
        console.log(price);
        filtros.price = price;
      }
    }

    // filter Sale. True or False
    if (sale) {
      filtros.sale = sale;
    }

    // filter Tags
    if (tags) {
      filtros.tags = { $in: tags };
      console.log(Advert.allowedTags());
      //   let arrayTags = tags.split(",");
    }

    console.log("filtros", filtros);

    const adverts = await Advert.lista(filtros, skip, limit, select, sort);
    res.json({ result: adverts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
