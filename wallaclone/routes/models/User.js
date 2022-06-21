'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    name: String,
    passwoer: String
    
});

const Agente = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;