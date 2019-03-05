//var html2canvas = require('html2canvas'); //('../node_modules/html2canvas/dist/npm/html2canvas.min.js');
function draw(metacode) {
    //import characters from ('../content/characters.js');
    var characters = require('../content/characters.js');
    console.log(characters);
    const { decryptMeta } = require('../content/parse-meta.js');
    //const { createCanvas, loadImage } = require('canvas');
    const Canvas = require('canvas');
    const canvas = Canvas.createCanvas(800, 600)
    const ctx = canvas.getContext('2d')

    Canvas.registerFont(__dirname+'/../content/LuckiestGuy-Regular.ttf', { family: 'LuckiestGuy' })

    //ctx.addFont(font)
    // Write "Awesome!"
    ctx.font = '30px LuckiestGuy'
    //ctx.font = '30px Impact'//LuckiestGuy'
    //ctx.rotate(0.1)
    ctx.fillText(JSON.stringify(decryptMeta(metacode)), 50, 100)
    //ctx.fillText('Awesome?!', 50, 100)

    // Draw line under text
    /*
    var text = ctx.measureText('Awesome?!')
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()
    */

    //add image
    return new Promise(resolve => {
        Canvas.loadImage('http://leaderboard.kingofthehat.com/content/portraits/Portrait_Zoe.png').then((image) => {
          ctx.drawImage(image, 50, 0, 70, 70)

          //console.log('<img src="' + canvas.toDataURL() + '" />')
        resolve(canvas);
        });
    });

    //return canvas;
}

module.exports = draw;
