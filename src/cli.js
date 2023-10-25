#!/usr/bin/env node
const { extrairLinks, validarLinks, estatisticas } = require('./validate-stats.js');
const chalk = require('chalk');

function arquivoNoTerminal() {
  const caminhoArquivo = process.argv[2];
  extrairLinks(caminhoArquivo).then((links) => {
    links.forEach(link => {
      console.log(chalk.yellow("Texto:", link.texto));
      console.log(chalk.blue("URL:", link.href));
    });
    validarLinks(links).then((linksValidados) => {
      linksValidados.forEach(link => {
        console.log(chalk.bold('O status do link é:') + chalk.green(link.status));
      })
      console.log(estatisticas(linksValidados));
    })
  }).catch((error) => {
    console.error(chalk.red(`Ocorreu um erro ao ler o arquivo: ${error}`));
  })
}
arquivoNoTerminal();


//substituir o await por .them
//lerArquivo(caminhoArquivo).then(console.log aqui dentro!)

// const inputs = process.argv
// console.log(inputs);
// console.log('Oi, CLI!');
