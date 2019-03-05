var fs = require('fs');



function draw(metacode) {
    //import characters from ('../content/characters.js');
    const characters = require('../content/characters.js');
    const { decryptMeta } = require('../content/parse-meta.js');
    var meta = decryptMeta(metacode);
    //const { createCanvas, loadImage } = require('canvas');
    const Canvas = require('canvas');
    var totalHeight = 40;
    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            var rows = (meta[i].length/9)-(meta[i].length % 9)/9+1;
            totalHeight += 40+100*rows+10;
        }
    }
    totalHeight += 30
    const canvas = Canvas.createCanvas(800, totalHeight)
    const ctx = canvas.getContext('2d')
    Canvas.registerFont(__dirname+'/../content/LuckiestGuy-Regular.ttf', { family: 'LuckiestGuy' })

    var placeAndDraw = function(name) {
        return new Promise(resolve => {
            fs.readFile(__dirname+'/../content/portraits/'+characters.character[name].image, (err, char) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('File not found!');
                    } else {
                        throw err;
                    }
                }
                const img = new Canvas.Image()
                img.onload = () => ctx.drawImage(img, positions[name].w,positions[name].h,70,100);//positions[meta[i][j]].w,positions[meta[i][j]].h,70,100);
                img.onerror = err => { if (err.code === 'ENOENT') {console.log('File not found!');} else {throw err;}}
                img.src = char
            })
            resolve();
        });
    }

    //ctx.addFont(font)
    // Write "Awesome!"
    ctx.font = '30px LuckiestGuy'
    //ctx.font = '30px Impact'//LuckiestGuy'
    //ctx.rotate(0.1)
    ctx.fillText(JSON.stringify(meta), 50, 100)
    //ctx.fillText('Awesome?!', 50, 100)
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 800, totalHeight);
    var tierTop = 40;
    //console.log(meta);
    var positions = {};
    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            ctx.fillStyle = "#696969";
            var rows = (meta[i].length/9)-(meta[i].length % 9)/9+1;
            ctx.fillRect(100, tierTop, 660, 40+100*rows);
            var width = 120;
            for (var j in meta[i]) {
                if (meta[i].hasOwnProperty(j)) {
                    console.log(__dirname+'/../content/portraits/'+characters.character[meta[i][j]].image);
                    //ctx.fillRect(width, tierTop+20, 70, 100);
                    positions[meta[i][j]] = [];
                    //positions[meta[i][j]].w = width;
                    //positions[meta[i][j]].h = tierTop+20;

                    positions[meta[i][j]].w = width-(70*9)*((j/9)-(j % 9)/9);
                    positions[meta[i][j]].h = tierTop+20+100*((j/9)-(j % 9)/9);

                    placeAndDraw(meta[i][j]);

                    width += 70; //width, tierTop+20)//, 70, 100)
                }
            }
            //meta[i]
            tierTop += 40+100*rows+10
        }
    }


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
