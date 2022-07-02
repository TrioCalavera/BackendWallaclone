var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Filtros por query string por tags, precios, nombre

router.get('/filterquerystring', (req, res, next) => {
  const tags = req.query.tags;
  //const color = req.params.color;
  const price = req.query.price;
  const name = req.query.name;
  console.log(req.query);

  res.send(`ok tags ${tags} name ${name} price ${price}`); //price, name} )
});

module.exports = router;