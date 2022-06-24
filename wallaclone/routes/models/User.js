'use strict';

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// esquema creado
const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    password: String
    
});

// método estatico
userSchema.statics.hashPassword = function(passwordClear) {
    return bcrypt.hash(passwordClear, 7);
};

// método de instancia

userSchema.methods.comparePasword = function(passwordClear) {
    return bcrypt.compare(passwordClear, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;