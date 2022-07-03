"use strict";

const mongoose = require("mongoose");

// definir un esquema

const advertSchema = mongoose.Schema(
  {
    name: { type: String, index: true },
    image: String,
    description: String,
    price: { type: Number, index: true },
    sale: { type: Boolean, index: true },
    tags: { type: [String], index: true },
  },
  {}
);

// Lista de filtros y condiciones
advertSchema.statics.lista = function (filtros, skip, limit, select, sort) {
  const query = Advert.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);

  return query.exec();
};

// tags permitidos
advertSchema.statics.allowedTags = function () {
  return ["work", "lifestyle", "mobile", "motor", "IT"];
};

// VER SI HAY QUE PONER AQUI PARA QUE CARGUE EL JSON DE ANUNCIOS

var Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
