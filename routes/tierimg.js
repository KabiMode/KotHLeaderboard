var express = require('express');
var router = express.Router();
var draw = require('../tier/tier.js');
/* GET home page. */
router.get('/:metacode', function(req, res, next) {
    //res.setHeader('Content-Type', 'image/png'); //'image/png');


    //draw().pngStream().pipe(res);
    var initDraw = draw(req.params.metacode);
    initDraw.then((canvas) => {
        console.log(canvas);
        canvas.pngStream().pipe(res);
    });


    //console.log("Hello");
    //res.render('index', { title: 'Express' });
    //res.sendFile('tier.js', { root: __dirname + '/../tier' }); //{ root: __dirname }
});

module.exports = router;
