'use strict';

const nodemailer = require('nodemailer');

module.exports = async function() {

  // desarrollo
  const testAccount = await nodemailer.createTestAccount();

  // config de desarrollo usando SMTP con ethereal
  const developConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  }

  const productionConfig = {
    service: process.env.EMAIL_SERVICE_NAME,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS
    }
  };

  const activeConfig = process.env.NODE_ENV === 'development' ?
    developConfig :
    productionConfig;

  const transport = nodemailer.createTransport(activeConfig);

  return transport;

}