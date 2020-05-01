const jimp = require('jimp');

jimp.read('imagens/imagem1.jpg').then(function (imagem) {
    imagem.cover(400, 400).greyscale().write('imagemCinza.jpg');
}).catch(err => {
    console.error(err);
});