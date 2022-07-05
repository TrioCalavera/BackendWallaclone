var express = require("express");
const Advert = require("../models/Advert");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Traer todos los anuncios
// router.get("/adverts", async (req, res, next) => {
//   try {
//     const tags = req.query.tags;
//     const price = req.query.price;
//     const name = req.query.name;
//     const sale = req.query.sale;

//     // Pagination
//     const skip = req.query.limit;

//     // Limits the amount
//     const limit = req.query.limit;

//     //Fields to show
//     const select = req.query.select;

//     //Field to sort
//     const sort = req.query.sort;

//     // Obj filtros
//     const filtros = {};

//     if (name) {
//       filtros.name = name;
//     }

//     //if (price) {
//       //console.log(price);
//       //filtros.price = price;
//     //}
//     if (typeof req.query.price !== 'undefined' && req.query.price !== '-') {
   
//       if (req.query.price.indexOf('-') !== -1) {
//         filtros.price = {};
//         let rango = req.query.price.split('-');
//         if (rango[0] !== '') {
//           filtros.price.$gte = rango[0];
//         }
  
//         if (rango[1] !== '') {
//           filtros.price.$lte = rango[1];
//         }
//       } else {
//         console.log(req.query.price);
//         filtros.price = req.query.price;
//       }
    
//     }

//     if (sale) {
//       filtros.sale = sale;
//     }

//     if (tags) {
//       filtros.tags = tags;
//     }
//     console.log(filtros);
//     // const adverts = await Advert.find();
//     const adverts = await Advert.lista(filtros, skip, limit, select, sort);
//     res.json({ result: adverts });
//   } catch (error) {
//     next(error);
//   }
// });

// GET /adverts/:name
// router.get("/adverts/:name", async (req, res, next) => {

//   if (typeof req.params.name !== 'undefined') {
//     filters.name = new RegExp('^' + req.params.name, 'i');
//   }
//   try {
//     //CUIDADO!!!
//     //Expresión regular para controlar acentos, espacios, ect.
//     const name = req.params.name;
//     const advert = await Advert.find({ name: name });

//     if (!advert) {
//       next(createError(404));
//       return;
//     }
//     res.json({ result: advert });
//   } catch (err) {
//     next(err);
//   }
// });

// GET /adverts?sale=false
// GET /adverts?sale=true
// router.get("/:sale", async (req, res, next) => {
//   try {
//     const sale = req.params.sale;
//     const advert = await Advert.find({ sale: sale });
//     console.log(advert);

//     if (!advert) {
//       next(createError(404));
//       return;
//     }
//     res.json({ result: advert });
//   } catch (err) {
//     next(err);
//   }
// });

// // GET /adverts:tags
// // ver con expresiones regulares para controlar cuando son varios, o ver como se recorre el array
// router.get("/:tags", async (req, res, next) => {
// 	try {
// 		const tags = req.params.tags;
// 		const advert = await Advert.find({ tags: tags });
//     console.log(advert);

// 		if(!advert) {
// 			next(createError(404));
// 			return;
// 		}
// 		res.json({ result: advert });
// 	} catch (err) {
// 		next(err);
// 	}
// });

// GET /adverts:price
// ver como solucionar que el tema de rango de precio
// router.get("/:price", async (req, res, next) => {
// 	try {
// 		const price = req.query.price;
//     console.log(price);
// 		const advert = await Advert.find({ price: price });
    
// 		if(!advert) {
// 			next(createError(404));
// 			return;
// 		}
// 		res.json({ result: advert });
// 	} catch (err) {
// 		next(err);
// 	}

//   if (typeof req.query.price !== 'undefined' && req.query.price !== '-') {
   
//     if (req.query.price.indexOf('-') !== -1) {
//       filters.price = {};
//       let rango = req.query.price.split('-');
//       if (rango[0] !== '') {
//         filters.price.$gte = rango[0];
//       }

//       if (rango[1] !== '') {
//         filters.price.$lte = rango[1];
//       }
//     } else {
//       console.log(req.query.price);
//       filters.price = req.query.price;
//     }
//     return filters;
//   }
  
// });

module.exports = router;
