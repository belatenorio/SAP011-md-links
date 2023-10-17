const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const { text } = require('stream/consumers');

// essa função obtém informações sobre o arquivo, e não sua extensão!
fs.stat('README.md', (error, stats) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Stats object for: README.md');
    console.log(stats);

    console.log('Path is file:', stats.isFile());
    console.log('Path is directory:', stats.isDirectory());
  }
});

function lerArquivo(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    if (path.extname(caminhoDoArquivo) === '.md') {
      fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          // resolve(data);
          //verifica os links dentro do arquivo markdow que combinam com o regex
          const linksCombinaComRegex = [...data.matchAll(/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm)];
          const links = [];
          for (i = 0; i < linksCombinaComRegex.length; i++) {

            const correspondencia = linksCombinaComRegex[i];
            const texto = correspondencia[1];
            const url = correspondencia[2];

            //armazena os dados separados dentro de um objeto
            const linkSeparado = { texto, url };
            links.push(linkSeparado);
          }
          links.forEach(link => {
            console.log(chalk.yellow("Texto:", link.texto));
            console.log(chalk.blue("URL:", link.url));
          });

          resolve(links);
        }
      });
    } else {
      reject('A extensão do arquivo não é .md');
    }
  });
};

//criar rejex
//ver no data as coisas que dão matchAll com o meu rejex
//fazer loop para pegar cada link 
//extrair o texto e o href
//construir objeto com texto e href
//colocar o objeto dentro de um array vazio(result.push())
//dar um resolve desse array

module.exports = { lerArquivo }

//construir uma função mdLinks que vai ser uma promise.
//construir um alerta para diretório que não tem nenhum arquivo com extensão .md