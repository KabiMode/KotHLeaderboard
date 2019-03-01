//var html2canvas = require('html2canvas'); //('../node_modules/html2canvas/dist/npm/html2canvas.min.js');
function draw() {
    const { createCanvas, loadImage } = require('canvas')
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d')

    // Write "Awesome!"
    ctx.font = '30px Impact'
    ctx.rotate(0.1)
    ctx.fillText('Awesome?!', 50, 100)

    // Draw line under text
    var text = ctx.measureText('Awesome?!')
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()

    //console.log(document.createElement("div"));
    //html2canvas(document.querySelector("#wrapper")).then(canvas => {
    //    console.log(canvas);
    //});

    //add image
    return new Promise(resolve => {
        loadImage('http://leaderboard.kingofthehat.com/content/portraits/Portrait_Zoe.png').then((image) => {
          ctx.drawImage(image, 50, 0, 70, 70)

          //console.log('<img src="' + canvas.toDataURL() + '" />')
        resolve(canvas);
        });
    });

    //return canvas;
}

module.exports = draw;
