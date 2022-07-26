'use strict';

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const emailTransportConfigure = require("../lib/mailerConf");
const { readHTMLFile } = require("../lib/utils")

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


userSchema.methods.enviarEmail = async function(asunto, message, receiver, advert) {
    var data = {
      username: this.name,
      useroffer: receiver.email,
      message: message,
      advert: advert.name,
    };
    
    var body = await readHTMLFile(data);
    
    // crear el transport
    const transport = await emailTransportConfigure();
    
    // enviar el email
    const result = await transport.sendMail({
      from: process.env.EMAIL_SERVICE_FROM,
      to: receiver.email,
      subject: asunto,
      html: body
    });
  
    console.log("Message sent: %s", result.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return result;
  }
  
//   userSchema.methods.enviarEmailConMicroservicio = async function(asunto, cuerpo) {
//     const evento = {
//       type: 'enviar-email',
  
//       from: process.env.EMAIL_SERVICE_FROM,
//       to: this.email,
//       subject: asunto,
//       html: cuerpo
//     };
  
//     return new Promise((resolve, reject) => requester.send(evento, (err, resultado) => {
//       if (err) {
//         const error = new Error(err.message);
//         error.status = 500;
//         reject(error);
//         return;
//       }
//       resolve(resultado);
//     }));
//   }

const User = mongoose.model('User', userSchema);

module.exports = User;