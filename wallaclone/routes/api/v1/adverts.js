//"use strict";

const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { validationResult} = require('express-validator')
const formValidation = require('../../../lib/formValidation')

const Advert = require("../../../models/Advert");
const User = require("../../../models/User");
const jwtAuth = require("../../../lib/jwtAuth");

// config multer to upload images
const multer = require("multer");
const path = require("path");
const { dirname } = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const randomStr = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + randomStr + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage });

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
    const limit = parseInt(req.query.limit) || 100;

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
    if (typeof tags !== "undefined") {
      if (tags !== "-") {
        filtros.tags = [];
        const t = tags.split("-");
        filtros.tags = { $in: t };
      } else {
        filtros.tags = { $in: tags };
      }
    }

    // REVISAR POR QUE DA ERROR AL USAR $GTE
    // Filter Create
    if (create) {
      // filtros.create.$gte = create;
      filtros.create = create;
    }

    const adverts = await Advert.getList(filtros, skip, limit, select, sort);
    res.status(200).json({ result: adverts });

  } catch (error) {
    next(error);
  }
});

router.get("/tags", (req, res, next) => {
  try {
    const adverts = Advert.allowedTags();
    res.status(200).json({ adverts });
  } catch (error) {
    next(error);
  }
});

// Traer 1 anuncio
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const advert = await Advert.findById(id);
    if (!advert) {
      return res.status(422).json({ error: 'Advert not found'});
    }

    res.json({ result: advert });
  } catch (err) {
    next(createError(422, "Invalid Id, not found."));
    return;
  }
});

// Crear 1 anuncio
router.post("/", jwtAuth(), upload.single("image"), formValidation.createAddValidator(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const advertData = req.body;

    // Reemplazar \ por /. Las dos.
    let filePathTemp = req.file.path.split("public")[1];
    let remplaceTemp = filePathTemp.replace("\\", "/");
    remplaceTemp = remplaceTemp.replace("\\", "/");
    advertData.image = remplaceTemp;

    const usuario = await User.findById(req.userId).exec();
    //asignamos el id del usuario al anuncio q esta creando.
    advertData.user = usuario._id;

    // Crea marca temporal
    advertData.create = Date.now();

    const advert = new Advert(advertData);
    const newAdvert = await advert.save();
    res.status(201).json({ result: newAdvert });
  } catch (err) {
    next(
      createError(
        400,
        "The server cannot or will not process the request due to something that is perceived to be a client error."
      )
    );
    return;
  }
});

// DEL /:id
// Borrar 1 anuncio
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const advert = await Advert.findOne({ _id: id });

    if (!advert) {
      res.status(404).json({ok: false, error: 'Advert does not exists'})
      return;
    }

    await Advert.deleteOne({ _id: id });

    res.status(200).json({ result: "Anuncio borrado", status: "ok" });
  } catch (err) {
    next(createError(422, "Invalid Id, not found."));
    return;
  }
});

module.exports = router;
