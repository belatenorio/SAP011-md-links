const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function extrairLinks(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    if (path.extname(caminhoDoArquivo) === '.md') {
      fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          //verifica os links dentro do arquivo markdow que combinam com o regex
          const linksCombinaComRegex = [...data.matchAll(/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm)];
          const links = [];
          for (i = 0; i < linksCombinaComRegex.length; i++) {
            const [, texto, href] = linksCombinaComRegex[i]; //utilização de desestruturação

            //armazena os dados separados dentro de um objeto
            const linkSeparado = { texto, href };
            links.push(linkSeparado);
          }
          resolve(links);
        }
      });
    } else {
      reject('A extensão do arquivo não é .md');
    }
  });
};

function validarLinks(links) {
  return new Promise(function (resolve, reject) {
const linksValidados = links.map(link => {
  return fetch(link.href)
    .then(response => {
      link.status = response.status;
      if (link.status >= 200 || link.status <= 404) {
        link.ok = 'ok';
      }else{
        link.ok = 'fail';
      }
      return link;
    })
    .catch(err => {
      reject(err)
      link.ok = 'fail';
      console.log(chalk.bgRedBright('O link está com erro'));
      return link;
    });
});
resolve(Promise.all(linksValidados));
  });
};

function estatisticas(links) {
  const contarLinks = links.length
  const linksUnicos = new Set(links.map((link) => link.href)).size;

  let linksQuebrados = 0;
  links.forEach((link) => {
    if (link.status !== 200) {
      linksQuebrados++;
    }
  });
  console.log(chalk.green('Total: ') + chalk.green(contarLinks));
  console.log(chalk.magenta('Unique: ') + chalk.magenta(linksUnicos));
  return { contarLinks, linksUnicos, linksQuebrados };
};

module.exports = { extrairLinks, validarLinks, estatisticas }

//criar rejex
//ver no data as coisas que dão matchAll com o meu rejex
//fazer loop para pegar cada link
//extrair o texto e o href
//construir objeto com texto e href
//colocar o objeto dentro de um array vazio(result.push())
//dar um resolve desse array

//correspondencia[0]: Contém a correspondência completa, ou seja, todo o texto no formato [texto](URL)
//correspondencia[1]: Contém o que está entre os primeiros colchetes [...], que é o texto do link
//correspondencia[2]: Contém o que está entre os parênteses (...), que é a URL do link

//Total: indica o número total de links encontrado dentro do arquivo
//Unique: indica o número de links únicos encontrados no arquivo. Mostrando que não há links duplicados
