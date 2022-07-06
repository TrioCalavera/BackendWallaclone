'use strict';

const bcrypt = require('bcrypt');
const emailTransportconfigure = require('../lib/emailTransportConfigure');
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

userSchema.methods.enviarEmail =async function(asunto, cuerpo) {
    //crear el transport
    const transport = emailTransportconfigure();

    // enviar el mail
    const result = await transport.sendMail({
        from: process.env.EMAIL_SERVICE_FROM,
        to: this.email,
        subject: asunto,
        html: cuerpo
    });

    console.log("Message sent: %s", result.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return result; 
}

const User = mongoose.model('User', userSchema);

module.exports = User;