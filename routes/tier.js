var express = require('express');
var router = express.Router();
var mustache = require('mustache');
var fs = require('fs');

/* GET home page. */
router.get('/:metacode', function(req, res, next) {
    //console.log("Hello");
    //res.render('index', { title: 'Express' });
    //res.sendFile('tier.htm', { root: __dirname + '/../views' }); //{ root: __dirname }
    const template = fs.readFileSync(__dirname + "/../views/tier.htm", "utf8")
    res.send(mustache.render(template, {host: req.protocol+'://'+req.headers.host, slash: '/', metacode: req.params.metacode})); //{ root: __dirname }
});
router.get('/', function(req, res, next) {
    //console.log("Hello");
    //res.render('index', { title: 'Express' });
    const template = fs.readFileSync(__dirname + "/../views/tier.htm", "utf8")
    res.send(mustache.render(template, {host: req.protocol+'://'+req.headers.host, slash: '', metacode: ''})); //{ root: __dirname }
});
//req.params.cool
module.exports = router;
