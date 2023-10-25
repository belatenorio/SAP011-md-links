const chalk = require('chalk');
const path = require('path');
const { text } = require('stream/consumers');

function mdLinks(){

};
// essa função obtém informações sobre o arquivo, e não sua extensão!
// fs.stat('README.md', (error, stats) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Stats object for: README.md');
//     console.log(stats);

//     console.log('Path is file:', stats.isFile());
//     console.log('Path is directory:', stats.isDirectory());
//   }
// });



module.exports = { mdLinks }

//construir um alerta para diretório que não tem nenhum arquivo com extensão .md