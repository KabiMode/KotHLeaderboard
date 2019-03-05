var fs = require('fs');



function draw(metacode) {
    const characters = require('../content/characters.js');
    const { decryptMeta } = require('../content/parse-meta.js');
    var meta = decryptMeta(metacode);
    //const { createCanvas, loadImage } = require('canvas');
    const Canvas = require('canvas');
    const dims = {
        "wtot": 817,
        "vmargin": 20,
        "hmargin": 20,
        "tierspacing": 10,
        "tiermargin": 13,
        "himage":  114,
        "wimage": 81.42,
        "wtab": 100,
        "htab": 100,
        "col": 8,
        "fontsize": 60,
    }
    var totalHeight = dims.vmargin*2-dims.tierspacing;
    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            var rows = (meta[i].length/dims.col)-(meta[i].length % dims.col)/dims.col+1;
            totalHeight += dims.tiermargin*2+dims.himage*rows+dims.tierspacing;
        }
    }
    const canvas = Canvas.createCanvas(dims.wtot, totalHeight)
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
                const img = new Canvas.Image();
                img.onload = () => {ctx.drawImage(img, positions[name].w,positions[name].h,dims.wimage,dims.himage);resolve(name);};//positions[meta[i][j]].w,positions[meta[i][j]].h,70,100);
                img.onerror = err => { if (err.code === 'ENOENT') {console.log('File not found!');} else {throw err;}}
                img.src = char
            })
        });
    }

    //ctx.addFont(font)
    // Write "Awesome!"
    ctx.font = dims.fontsize+'px LuckiestGuy'
    //ctx.fillStyle = "#FF0000";
    //ctx.fillRect(0, 0, dims.wtot, totalHeight);
    var tierTop = dims.vmargin;
    var colors = {"S":"#FF7F7F","A":"#FFBF7F","B":"#FFDF7F","C":"#FFFF7F","D":"#BFFF7F","E":"#7FFF7F"};
    var positions = {};
    var promises = [];
    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            //tab
            ctx.fillStyle = colors[i];
            ctx.shadowColor = "rgba(0,0,0,0)";
            ctx.shadowBlur = 0;
            ctx.fillRect(dims.hmargin, tierTop, dims.wtab, dims.htab);
            //text
            ctx.fillStyle = "#FFFFFF";
            var text = ctx.measureText(i);
            ctx.shadowOffsetY = 4;
            ctx.shadowColor = "#000000";
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.strokeText(i, dims.hmargin+dims.wtab/2-text.width/2, tierTop+text.actualBoundingBoxAscent/2+dims.htab/2);
            ctx.fillText(i, dims.hmargin+dims.wtab/2-text.width/2, tierTop+text.actualBoundingBoxAscent/2+dims.htab/2);
            //tiers

            ctx.shadowColor = "rgba(0,0,0,0)";
            ctx.fillStyle = "#696969";
            var rows = (meta[i].length/dims.col)-(meta[i].length % dims.col)/dims.col+1;
            ctx.fillRect(dims.hmargin+dims.wtab, tierTop, dims.wtot-(dims.hmargin*2+dims.wtab), dims.tiermargin*2+dims.himage*rows);
            var width = dims.hmargin+dims.wtab+dims.tiermargin;
            for (var j in meta[i]) {
                if (meta[i].hasOwnProperty(j)) {
                    positions[meta[i][j]] = [];
                    positions[meta[i][j]].w = width-(dims.wimage*dims.col)*((j/dims.col)-(j % dims.col)/dims.col);
                    positions[meta[i][j]].h = tierTop+dims.tiermargin+dims.himage*((j/dims.col)-(j % dims.col)/dims.col);
                    ctx.shadowOffsetY = 1;
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = "#000000";
                    promises.push(placeAndDraw(meta[i][j]));
                    width += dims.wimage; //width, tierTop+20)//, 70, 100)
                }
            }
            tierTop += dims.tiermargin*2+dims.himage*rows+dims.tierspacing;
        }
    }

    //add image
/*
    return new Promise(resolve => {
        Canvas.loadImage('http://leaderboard.kingofthehat.com/content/portraits/Portrait_Zoe.png').then((image) => {
            ctx.drawImage(image, 50, 0, 70, 70)

            //console.log('<img src="' + canvas.toDataURL() + '" />')
            console.log(promises);
            //resolve(canvas);
            resolve(canvas);
            //Promise.all(promises).then(resolve => {
            //    resolve(canvas); // [3, 1337, "foo"]
            //});
        });
    });*/
    return new Promise(resolve => {
        Promise.all(promises).then(function(values) {
            console.log(values);
            resolve(canvas);
        });
    });
}

module.exports = draw;
