'use strict'

const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../../../models/User')

// POST /authenticate
router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    
    //Buscamos el usuario
    const user = await User.findOne({ email });
    if (!user) {
      // Respondemos que no son validas las credenciales
      res.status(404).json({ok: false, error: 'User does not exists'})
      return
    }
    //Vemos que el password sea el correcto
    var isValid = await user.comparePasword(password);

    if (!isValid) {
      // Respondemos que no son validas las credenciales

      res.status(401).json({ok: false, error: 'invalid credentials'})

      return
    }

    // el usuario está y coincide la password

    // creamos el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, token) => {
      if (err) {
        return next(err)
      }
      // respondemos con un JWT
      res.status(200).json({ok: true, token: token})
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router