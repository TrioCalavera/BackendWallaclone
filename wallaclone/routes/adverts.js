var express = require('express');
const createError = require('http-errors');
var router = express.Router();

const Advert = require('../models/Advert')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try{
    const name = req.query.name;
    const image = req.query.image;
    const description = req.query.Description;
    const price = req.query.Price;
    const sale = req.query.sale;
    const tags = req.query.tags;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;
    

    const filters = {};

    
    if (name) {
      filters.name = name;
    }
    if (image) {
      filters.image =image ;
    }
    if (sale) {
        filters.sale =sale ;
      }
      if (tags) {
        filters.tags =tags ;
      }  
      if (price) {
        filters.price =price ;
      }  
      if (description) {
        filters.description =description ;
      }  
    const adverts = await Advert.getList(filters, skip, limit, select, sort);

    res.status(200).json({ results: adverts });
  }catch(err){
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const advert = await Advert.findOne({ _id: id });

    if (!advert) {
      next(createError(404));
      return;
    }

    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
