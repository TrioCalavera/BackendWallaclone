'use strict';

const jwt = require('jsonwebtoken');
const { User } = require('../models');

class LoginController {



// enviar un email al usuario
      // usuario.enviarEmail('Bienvenido', 'Bienvenido a NodeApp');
      const result = await user.enviarEmail('Bienvenido', 'Bienvenido a Wallaclone')
        
     console.log('Hubo un error al enviar el email');
    

      
      res.redirect('/privado');
    } catch (err) {
      next(err);
    }


    module.exports = LoginController;
  