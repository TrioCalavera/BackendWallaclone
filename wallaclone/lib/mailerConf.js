'use strict';

const nodemailer = require('nodemailer');

module.exports = async function() {

  // config usando SMTP de Gmail
  const activeConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS
    }
  }

  const transport = nodemailer.createTransport(activeConfig);

  return transport;

}