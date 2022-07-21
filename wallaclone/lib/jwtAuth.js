'use strict'
var createError = require("http-errors");

const jwt = require('jsonwebtoken')

module.exports = function(){
    return function(req, res, next){
        try {
            var token = req.body.token || req.query.token || req.get('x-access-token') || req.headers['authorization'];
            
            //peticion sin token no autorizado
            if(!token){
                const err = createError(401,'No token provided.');
                return next(err)
            }else{
                if(token.startsWith('Bearer')){                    
                    token = token.split(' ')[1];                     
                }
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