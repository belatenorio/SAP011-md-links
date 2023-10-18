const { lerArquivo } = require('./index.js');
const chalk = require('chalk');

function validacaoLinks(links) {
  links.forEach(link => {
    fetch(link.href)
      .then(response => {
        if (response.status === 200 || response.status === 404) {
          console.log(chalk.red('O status do link é:', response.status));
        }
      })
      .catch(err => {
        console.log(err);
      });
  })
}

const caminhoDoArquivo = process.argv[2];
lerArquivo(caminhoDoArquivo)
  .then(links => {
    validacaoLinks(links);
  })
  .catch(err => {
    console.error(err);
  });

module.exports = { validacaoLinks }
//404 - not-found
//200 - ok (solicitação bem sucedida)