var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log("Hello");
    //res.render('index', { title: 'Express' });
    res.sendFile('tier.htm', { root: __dirname + '/../views' }); //{ root: __dirname }
});

module.exports = router;
