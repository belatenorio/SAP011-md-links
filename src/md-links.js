const fs = require('fs');
const path = require('path');

function mdLinks(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    if (path.extname(caminhoDoArquivo) !== '.md') {
      reject({message: 'A extensão do arquivo não é .md'});
    }
    else {
      fs.readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
        if (err) {
          reject({message: 'Arquivo não encontrado'});
        }
        else {
          const linksCombinaComRegex = [...data.matchAll(/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm)];
          const links = [];
          for (i = 0; i < linksCombinaComRegex.length; i++) {
            const [, texto, href] = linksCombinaComRegex[i]; //utilização de desestruturação

            const linkSeparado = { texto, href };
            links.push(linkSeparado);
          }
          if (links.length === 0) {
            reject({ message: 'Nenhum link encontrado dentro do arquivo' });
          }
          else {
            resolve(links);
          }
        }
      });
    }
  });
};

function validarLinks(links) {
  return new Promise(function (resolve, reject) {
    const linksValidados = links.map(link => {
      return fetch(link.href)
        .then(response => {
          link.status = response.status;
          if (link.status >= 200 && link.status <= 299) {
            link.texto
            link.href
            link.ok = 'ok';
          } else {
            link.ok = 'fail';
          }
          return link;
        })
        .catch(err => {
          reject(err)
          link.href
          link.ok = 'fail';

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
  return { contarLinks, linksUnicos, linksQuebrados };
};

module.exports = { mdLinks, validarLinks, estatisticas }

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


