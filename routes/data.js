var express = require('express');
var router = express.Router();
var getJSON = require('get-json')

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('respond with a resource');
    //res.sendFile('KotHBorderBack.png', { root: __dirname + '/../data' });
    console.log('https://api.kingofthehat.com/' + req._parsedOriginalUrl.path.substr(6));

    getJSON('https://api.kingofthehat.com/' + req._parsedOriginalUrl.path.substr(6), function(error, response){ //'https://api.kingofthehat.com/leaderboard?house=brilliance'

        //console.log(error);
        // undefined

        //console.log(response);
        res.send(response);
    });

  //console.log(req);
});

module.exports = router;
