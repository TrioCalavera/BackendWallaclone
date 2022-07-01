var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Filtros por query string por tags, precios, nombre

router.get('/tags/:tags(work|lifestyle|mobile|motor|IT)/price/:price?/name/:name?', (req, res, next) => {
  const tags = req.params.tags;
  //const color = req.params.color;
  //const price = req.params.price;
  //const name = req.params.name;

  res.send(`ok tags ${tags}`) //color, price, name} )
})

module.exports = router;
////price/:price?/name/:name?