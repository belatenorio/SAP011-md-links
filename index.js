const fs = require('fs');
const chalk = require('chalk');

//criar uma função que verifica se a extensão do arquivo para leitura é md

function lerArquivo(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
};

//criar função mdLinks para extrair os links do arquivo md

module.exports = { lerArquivo }

//console.log(chalk.blue(nome da constante));
//console.log(chalk.bgRed("A soma é:"), chalk.blue(resultado));

//construir uma função mdLinks que vai ser uma promise.