function decryptMeta(parameters){
    // url format: /220A00
    //parameters = "220A00-743BCF0125689A"
    var newMeta = {"S":[],"A":[],"B":[],"C":[],"D":[],"E":[]}
    var deli = parameters.split("-")[0];
    var chas = parameters.split("-")[1];
    var i = 0;
    for (var j = 0; j < deli.length; j++) {
        for (var k = 0; k < parseInt(deli[j], 36); k++) {
            console.log(j+": "+characters.id[chas[i]]);
            newMeta[Object.keys(newMeta)[j]].push(characters.id[chas[i]])
            i++;
        }
    }
    return newMeta;
}
function encryptMeta(meta){

}
module.exports = {
    decryptMeta: decryptMeta,
    encryptMeta: encryptMeta
};
