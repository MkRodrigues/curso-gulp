const jimp = require('jimp');
const fs = require('fs');
// fs de FyleSytem/Sistema de Arquivo proprietário do Node, não havendo necessidade de instalação de nenhum outro pacote

// A função read dir Sync, Lê o diretório e faz cada ação para cada item
const imagens = fs.readdirSync('./imagens/');

// Para cada imagem do vetor de imagens (imagens), será...
imagens.forEach(function (arquivo) {
    jimp.read('imagens/' + arquivo).then(function (imagem) {
        imagem.cover(400, 400)
        .greyscale()
        .write('imagens/otimizadas/' + arquivo);

    }).catch(err => {
        console.error(err);
    });
});