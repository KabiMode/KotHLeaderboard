var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

    const { createCanvas, loadImage } = require('canvas')
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d')

    // Write "Awesome!"
    ctx.font = '30px Impact'
    ctx.rotate(0.1)
    ctx.fillText('Awesome!', 50, 100)

    // Draw line under text
    var text = ctx.measureText('Awesome!')
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()

    // Draw cat with lime helmet
    //loadImage('../content/portraits/Portrait_Zoe.png').then((image) => {
      //ctx.drawImage(image, 50, 0, 70, 70)

      console.log('<img src="' + canvas.toDataURL() + '" />')
    //})

    function sendAsPNG(response, canvas) {
        var stream = canvas.createPNGStream();
        response.type("png");
        stream.pipe(response);
    };
    sendAsPNG(res, canvas);
    //console.log("Hello");
    //res.render('index', { title: 'Express' });
    //res.sendFile('tier.js', { root: __dirname + '/../tier' }); //{ root: __dirname }
});

module.exports = router;
