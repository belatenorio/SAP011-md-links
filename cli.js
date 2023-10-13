#!/usr/bin/env node
// A CLI serve para modificar o terminal
//manter tudo que é console.log dentro da CLI
const { lerArquivo } = require('./index.js');
const chalk = require('chalk');

async function arquivoNoTerminal() {
  const caminhoArquivo = process.argv[2];
  try{
    const conteudoDoArquivo = await lerArquivo(caminhoArquivo);
    console.log(chalk.blue(conteudoDoArquivo));
  } catch (error) {
    console.error(chalk.red(`Ocorreu um erro ao ler o arquivo: ${error}`));
  }
};

arquivoNoTerminal()

// const inputs = process.argv
// console.log(inputs);
// console.log('Oi, CLI!');
