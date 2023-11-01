#!/usr/bin/env node
const { mdLinks, validarLinks, estatisticas } = require('./md-links.js');
const chalk = require('chalk');

const comando = {
  mdLinks: process.argv[0],
  'validate': process.argv.includes('--validate'),
  'stats': process.argv.includes('--stats')
};

function print(caminhoArquivo, link) {
  console.log(chalk.white(caminhoArquivo, ' ') + chalk.yellow(link.texto) + chalk.blue(' ', link.href));
}

function printValidate(caminhoArquivo, link) {
  if (link.status === 200) {
    console.log(chalk.white(caminhoArquivo, ' ') + chalk.yellow(link.texto) + chalk.blue(' ', link.href) + chalk.magenta(' ', link.status) + chalk.green(' OK'));
  } 
  else {
    console.log(chalk.white(caminhoArquivo, ' ') + chalk.yellow(link.texto) + chalk.blue(' ', link.href) + chalk.magenta(' ', link.status) + chalk.bold.red(' FAIL'));
  }
}

function printStats(linksValidados) {
  const resultadoEstatisticas = estatisticas(linksValidados);
  console.log(chalk.green('Total: ') + chalk.green(resultadoEstatisticas.contarLinks));
  console.log(chalk.magenta('Unique: ') + chalk.magenta(resultadoEstatisticas.linksUnicos));
}

function printValidateStats(linksValidados) {
  const resultadoEstatisticas = estatisticas(linksValidados);
  console.log(chalk.green('Total: ') + chalk.green(resultadoEstatisticas.contarLinks));
  console.log(chalk.magenta('Unique: ') + chalk.magenta(resultadoEstatisticas.linksUnicos));
  console.log(chalk.red('Broken: ') + chalk.red(resultadoEstatisticas.linksQuebrados));
}

function comandosTerminal() {
  const caminhoArquivo = process.argv[2];
  mdLinks(caminhoArquivo).then((links) => {
    if (!comando.stats && !comando.validate) {
      links.forEach(link => {
        print(caminhoArquivo, link);
      });
    } else {
      validarLinks(links).then((linksValidados) => {
        if (comando.validate && !comando.stats) {
          linksValidados.forEach((link) => {
            printValidate(caminhoArquivo, link);
          });
        }
        if (comando.stats && !comando.validate) {
          printStats(linksValidados)
        }
        if (comando.validate && comando.stats) {
          printValidateStats(linksValidados)
        }
      });
    }
  }).catch((error) => {
    console.error(chalk.red(error.message));
  });
}

comandosTerminal();