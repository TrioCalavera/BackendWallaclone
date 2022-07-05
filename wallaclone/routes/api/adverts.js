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
  
    //  filtro por nombres
    
    if (typeof req.query.name !== 'undefined') {
        filtros.name = new RegExp('\\b' + req.query.name + '\\b', 'i');
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
  
    //   if (tags) {
    //     filtros.tags = tags;
    //   }
      console.log(req.query.tags);
    if (typeof req.query.tags !== 'undefined' && req.query.tags !== ',') {
        
        if (req.query.tags.indexOf(',') !== -1) {
          filtros.tags = {};
          let rango = req.query.tags.split(',');
        
        console.log(rango);
        filtros.tags = { "$in": rango };
        }
      
      }else{
        filtros.tags = { $in: req.query.tags};
      }

    //   if (tags) {
    //       filtros.tags = { $in: rango };
    //     }

        
      console.log('/get',filtros);
      // const adverts = await Advert.find();
      const adverts = await Advert.lista(filtros, skip, limit, select, sort);
      res.json({ result: adverts });
    } catch (error) {
      next(error);
    }
  });

//   router.get("/:tags", async (req, res, next) => {
//     try {
//         const tags = req.params.tags;
//         console.log(tags);
//         const advert = await Advert.find({ tags: {"$in":tag} });
//        console.log(advert);

//         if(!advert) {
//             next(createError(404));
//             return;
//         }
//         res.json({ result: advert });
//     } catch (err) {
//         next(err);
//     }
// });
  

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
