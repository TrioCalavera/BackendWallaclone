"use strict";

const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = mongoose.model('User');

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
    user: {type: Schema.ObjectId, ref: User}
  },
  {}
);

// Lista de filtros y condiciones
advertSchema.statics.getList = function (filtros, skip, limit, select, sort) {
  const query = Advert.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);

  return query.exec();
};



var Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
