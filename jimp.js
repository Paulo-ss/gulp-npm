// Importando o Jimp (manipulador de imagens)
const Jimp = require("jimp");
// Importando o leitor de arquivos do Node
const fs = require("fs");

// Pegando todas as imagens e colocando elas em uma array
const arrayImg = fs.readdirSync("./img/");

// Fazendo um loop por todas as imagens e otimizando elas
arrayImg.forEach((file) => {
  Jimp.read("./img/" + file)
    .then((img) => {
      return img
        .cover(400, 400)
        .quality(60)
        .write("./img/otimizadas/" + file);
    })
    .catch((err) => {
      console.log(err);
    });
});
