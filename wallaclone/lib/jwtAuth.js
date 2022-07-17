'use strict'
var createError = require("http-errors");

const jwt = require('jsonwebtoken')

module.exports = function(){
    return function(req, res, next){
        try {
            const token = req.body.token || req.query.token || req.get('Authorization');
            console.log(token);
            //peticion sin token no autorizado
            if(!token){
                const err = createError(401,'No token provided.');
                return next(err)
            }
            
            jwt.verify(token,process.env.JWT_SECRET, (err, decoded)=> {
                if (err) {
                return next(err)
                }
                // guardo el id del usuario en request para que
                // los siguientes middlewares puedan usarlo
                req.userId = decoded._id
                next()
            })            
        } catch (error) {
            createError(404,error);
        }
    }

}