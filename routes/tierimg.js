var express = require('express');
var router = express.Router();
var draw = require('../tier/tier.js');
/* GET home page. */
router.get('/', function(req, res, next) {

      res.setHeader('Content-Type', 'image/png');
      draw().pngStream().pipe(res);
    //console.log("Hello");
    //res.render('index', { title: 'Express' });
    //res.sendFile('tier.js', { root: __dirname + '/../tier' }); //{ root: __dirname }
});

module.exports = router;
