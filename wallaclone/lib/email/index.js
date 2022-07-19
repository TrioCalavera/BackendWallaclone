'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const app = require("../../app");
const router = express.Router();
require('dotenv').config();

router.post("/", (req, res, next) => {
    try {
        
    
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Esribe un correo al anunciante</h3>
        <ul>
            <li>Email: ${req.body.email}</li>
            <li>Asunto: ${req.body.asunto}</li>
        </ul>
        <h3>Mensaje</h3>
        <p>${req.body.mensaje}</p>
        `;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: false,
            port: 587,
            auth: {
                //type: "OAuth2",
                user: process.env.CONFIG_EMAIL_USER,
                pass: process.env.CONFIG_EMAIL_PASS
            }
        });
        let mailOptions = {
            from: "eltriocalaverabmj@gmail.com",
            to: req.body.email,
            replyTo: "eltriocalaverabmj@gmail.com",
            subject: req.body.asunto,
            text: req.body.mensaje,
            html: htmlEmail
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log("Mensaje enviado: %s", info.mensaje);
            console.log("Url del mensaje: %s", nodemailer.getTestMessageUrl(info));
        });

    });
    res.status(200).json();
} catch (error) {
     next(error);   
}
});

module.exports = router;

// Así lo hace Javier

// 'use strict';

// const nodemailer = require('nodemailer');

// module.exports = async function() {

//   // desarrollo
//   const testAccount = await nodemailer.createTestAccount();

//   // config de desarrollo usando SMTP con ethereal
//   const developConfig = {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass
//     }
//   }

//   const productionConfig = {
//     service: process.env.EMAIL_SERVICE_NAME,
//     auth: {
//       user: process.env.EMAIL_SERVICE_USER,
//       pass: process.env.EMAIL_SERVICE_PASS
//     }
//   };

//   const activeConfig = process.env.NODE_ENV === 'development' ?
//     developConfig :
//     productionConfig;

//   const transport = nodemailer.createTransport(activeConfig);

//   return transport;

// }

