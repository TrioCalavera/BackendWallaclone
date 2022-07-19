"use strict";

const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs-extra");

// definir un esquema
const advertSchema = mongoose.Schema(
  {
    name: { type: String, index: true },
    image: String,
    description: String,
    price: { type: Number, index: true },
    sale: { type: Boolean, index: true },
    tags: { type: [String], index: true },
    create: { type: Number, index: true },
  },
  {}
);

// Lista de filtros y condiciones
advertSchema.statics.getList = async function (
  filtros,
  skip,
  limit,
  select,
  sort
) {
  const query = Advert.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);

  return await query.exec();
};

advertSchema.methods.setFoto = async function ({
  path,
  originalname: originalName,
}) {
  if (!originalName) return;

  // copiar el fichero desde la carpeta uploads a public/images
  // usando en nombre original del producto
  // SUGERENCIA: en un proyecto real, valorar si quereis poner el _id del usuario (this._id)
  // para diferenciar imagenes con el mismo nombre de distintos usuarios
  const imagePublicPath = path.join(
    __dirname,
    "../public/images",
    originalName
  );
  await fs.copy(path, imagePublicPath);

  this.image = originalName;
};

var Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
