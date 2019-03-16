var express = require('express');
var router = express.Router();
var draw = require('../views/tier.js');
/* GET home page. */

//get image with parameters
router.get('/:metacode.png', function(req, res, next) {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    var initDraw = draw(req.params.metacode);
    initDraw.then((canvas) => {
        console.log(canvas);
        canvas.pngStream().pipe(res);
    });
});
//get base image
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    var initDraw = draw("124231-76A298B1053C4");// TODO: this is an interim solution for the until the agreed on meta can be pragmatically generated in an external json file
    initDraw.then((canvas) => {
        console.log(canvas);
        canvas.pngStream().pipe(res);
    });
});

module.exports = router;
