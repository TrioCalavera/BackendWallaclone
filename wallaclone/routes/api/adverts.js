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
    const create = parseInt(req.query.create);

    // Pagination
    const skip = req.query.limit;

    // Limits the amount
    const limit = parseInt(req.query.limit) || 15;

    //Fields to show
    const select = req.query.select;

    //Field to sort
    const sort = req.query.sort || 'create';

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
        filtros.price = price;
      }
    }

    // filter Sale. True or False
    if (sale) {
      filtros.sale = sale;
    }

    // filter Tags
    if (tags) {
      filtros.tags = new RegExp("\\b" + tags + "\\b", "i");
    }

    // REVISAR POR QUE DA ERROR AL USAR $GTE
    // Filter Create
    if (create) {
      // filtros.create.$gte = create;
      filtros.create = create;
    }

    const adverts = await Advert.lista(filtros, skip, limit, select, sort);
    res.json({ result: adverts });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) =>{
  try {
      const advertData = req.body;

      const advert = new Advert(advertData);

      const newAdvert = await advert.save()
      res.status(201).json({ result: newAdvert})
  } catch (err) {
      next(err);
  }
})

module.exports = router;
