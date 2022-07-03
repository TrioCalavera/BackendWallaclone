var express = require("express");
const Advert = require("../models/Advert");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Traer todos los anuncios
router.get("/adverts", async (req, res, next) => {
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

    if (name) {
      filtros.name = name;
    }

    if (price) {
      filtros.price = price;
    }

    if (sale) {
      filtros.sale = sale;
    }

    if (tags) {
      filtros.tags = tags;
    }

    // const adverts = await Advert.find();
    const adverts = await Advert.lista(filtros, skip, limit, select, sort);
    res.json({ result: adverts });
  } catch (error) {
    next(error);
  }
});

// GET /adverts/:name
router.get("/adverts/:name", async (req, res, next) => {
  try {
    //CUIDADO!!!
    //Expresión regular para controlar acentos, espacios, ect.
    const name = req.params.name;
    const advert = await Advert.find({ name: name });

    if (!advert) {
      next(createError(404));
      return;
    }
    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
});

// GET /adverts?sale=false
// GET /adverts?sale=true
router.get("/:sale", async (req, res, next) => {
  try {
    const sale = req.params.sale;
    const advert = await Advert.find({ sale: sale });
    console.log(advert);

    if (!advert) {
      next(createError(404));
      return;
    }
    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
