function decryptMeta(parameters){
    // url format: /220A00
    //parameters = "220A00-743BCF0125689A"
    var newMeta = {"S":[],"A":[],"B":[],"C":[],"D":[],"E":[]}
    var deli = parameters.split("-")[0];
    var chas = parameters.split("-")[1];
    var i = 0;
    for (var j = 0; j < deli.length; j++) {
        for (var k = 0; k < parseInt(deli[j], 36); k++) {
            newMeta[Object.keys(newMeta)[j]].push(characters.id[chas[i]])
            i++;
        }
    }
    return newMeta;
}
function encryptMeta(meta){
    var deli = "";
    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            var tierLength =meta[i].length;
            deli += (tierLength).toString(36);
        }
    }
    var chas = "";
    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            for (var j in meta[i]) {
                if (meta[i].hasOwnProperty(j)) {
                    console.log(meta[i][j]);
                    console.log(characters);
                    console.log(characters.character);
                    chas += characters.character[meta[i][j]].id;
                }
            }
        }
    }
    console.log(deli);
    console.log(chas);
    metacode = (deli+'-'+chas).toUpperCase();
    return metacode
}
module.exports = {
    decryptMeta: decryptMeta,
    encryptMeta: encryptMeta
};
