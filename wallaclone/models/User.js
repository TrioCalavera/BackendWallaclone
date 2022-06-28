'use strict';

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// esquema creado
const userSchema = mongoose.Schema(
    {
        email: { type: String, unique: true },
        name: String,
        password: String,
        role: String    
    },
    {},
    );

// método estatico
userSchema.statics.hashPassword = function(passwordClear) {
    console.log(passwordClear);
    return bcrypt.hash(passwordClear, 7);
};

userSchema.statics.getList = function (filters, skip, limit, select, sort) {
    const query = User.find(filters);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    return query.exec(); 
  };

 // método de instancia

userSchema.methods.comparePasword = function(passwordClear) {
    return bcrypt.compare(passwordClear, this.password);
} 

const User = mongoose.model('User', userSchema);

module.exports = User;