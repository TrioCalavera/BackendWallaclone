'use strict';

const mongoose = require('mongoose');

// definir un esquema

const advertSchema = mongoose.Schema(
    {
    name: {type : String, index: true },
    image: String,
    Description: String, 
    Price: { type: Number, index: true }, 
    sale: { type: Boolean, index: true },
    tags: { type: [String], index: true}
    },{},
    );

// tags permitidos

advertSchema.statics.allowedTags = function () {
    return [ 'work', 'lifestyle', 'mobile', 'motor', 'IT']
};

// VER SI HAY QUE PONER AQUI PARA QUE CARGUE EL JSON DE ANUNCIOS

var Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;