'use strict'
const {body} = require('express-validator')

 const createAddValidator = () => {
  return([

    body('sale').isBoolean(),
    body('price').isNumeric(),
    body('description').isLength({ min: 3 }),
    body('name').isLength({ min: 3 })
  
  ] 
  )
}

 const createUserValidator = () => {
  return ([
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    body('name').isLength({ min: 3 })
  ])
}


exports.createAddValidator= createAddValidator
exports.createUserValidator= createUserValidator

