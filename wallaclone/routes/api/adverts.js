//"use strict";

const express = require("express");
const Advert = require("../../models/Advert");
const router = express.Router();

//Traer todos los anuncios
router.get("/", async (req, res, next) => {
    try {
      console.log("api");
      const tags = req.query.tags;
      const price = req.query.price;
      const name = req.query.name;
      const sale = req.query.sale;
  
      // Pagination
      const skip = req.query.limit;
  
      // Limits the amount
      const limit = req.query.limit;
  
      //Fields to show
      const select = req.query.select;
  
      //Field to sort
      const sort = req.query.sort;
  
      // Obj filtros
      const filtros = {};
  
    //  
    
    if (typeof req.query.name !== 'undefined') {
        filtros.nombre = new RegExp('^' + req.query.name, 'i');
      }
  
  
    // filter price
      if (typeof req.query.price !== 'undefined' && req.query.price !== '-') {
     
        if (req.query.price.indexOf('-') !== -1) {
          filtros.price = {};
          let rango = req.query.price.split('-');
          if (rango[0] !== '') {
            filtros.price.$gte = rango[0];
          }
    
          if (rango[1] !== '') {
            filtros.price.$lte = rango[1];
          }
        } else {
          console.log(req.query.price);
          filtros.price = req.query.price;
        }
      
      }
  
      if (sale) {
        filtros.sale = sale;
      }
  
      if (tags) {
        filtros.tags = tags;
      }
      console.log(filtros);
      // const adverts = await Advert.find();
      const adverts = await Advert.lista(filtros, skip, limit, select, sort);
      res.json({ result: adverts });
    } catch (error) {
      next(error);
    }
  });
  

//GET /api/adverts

//  router.get("/", async (req, res, next) => {
//    try {
//      const adverts = await Advert.find();
//      res.json({ result: adverts });
//    } catch (error) {
//      next(err);
//    }
//  });

module.exports = router;
