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
    const sort = req.query.sort || "create";

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
      filtros.tags = { $in: tags };
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

// Traer 1 anuncio
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const advert = await Advert.findOne({ _id: id });

    if (!advert) {
      next(createError(404));
      return;
    }

    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
});

// Crear 1 anuncio
router.post("/", async (req, res, next) => {
  try {
    const advertData = req.body;

    // Crea marca temporal
    advertData.create = Date.now();

    const advert = new Advert(advertData);
    const newAdvert = await advert.save();
    res.status(201).json({ result: newAdvert });
  } catch (err) {
    next(err);
  }
});

// DEL /:id
// Borrar 1 anuncio
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Advert.deleteOne({ _id: id });

    res.json({ result: "Anuncio borrado", status: "ok" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
