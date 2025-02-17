# Markdown Links

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Fluxograma](#2-fluxograma)
* [3. Principais funcionalidades](#3-principais-funcionalidades)
* [4. Guia de instalação e uso](#4-guia-de-instalação-e-uso)
* [5. Testes Unitários](#5-testes-unitários)
* [6. Critérios Mínimos](#6-critérios-mínimos)
* [7. Tecnologias Utilizadas](#7-tecnologias-utilizadas)
* [8. Autora](#8-autora)

***

## 1. Prefácio
[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação
muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos
com este formato em qualquer repositório, como por exemplo o README.md.
Os arquivos Markdown normalmente contém links que podem estar
quebrados, ou que já não são válidos, prejudicando muito o valor da
informação que está ali. Por esse motivo, o presente projeto tem como objetivo ser uma biblioteca que extrai os links de um arquivo Markdown e valida-os. 

## 2. Fluxograma

Como este projeto é testado por meio do terminal, desenvolvi um fluxograma para melhor organizar e direcionar cada marco do processo, proporcionando uma visualização mais clara e facilitando a execução de cada etapa.

<img src="./src/image/fluxograma.png" alt="Flowchart" width='700'/>

## 3. Principais funcionalidades

* Leitura e extração de links de um arquivo `Markdown (.md)`;
* Validação dos links com exibição do `HTTP status code` de cada link utilizando a opção `--validate`;
* Dados estatísticos dos links contidos no arquivo .md utilizando a opção `--stats`;
* Combinação de validação (`--validate`) e dados estastíticos dos links (`--stats`) com informações sobre links totais, únicos e quebrados. 
* Mensagens de erro para os comandos executados incorretamente pelos usuários.

## 4. Guia de instalação e uso

### 4.1. Instalação 
* **Para instalação da biblioteca execute o comando através do terminal:**
```
npm install md-links-isabela-tenorio
```  

### 4.2. Uso

**Extração de links:**
* Para leitura e extração dos links de um arquivo .md, execute:
```
md-links <caminho-do-arquivo>
```
<p><img src='./src/image/md-links-path.PNG' alt="md-links"></p>

**Validação dos links:**
* Para validar links de um arquivo Markdown, execute:
```
md-links <caminho-do-arquivo> --validate
```
<p><img src='./src/image/validate.PNG' alt="md-links --validate"></p>

**Dados estatísticos dos links:**
* Para gerar dados estatísticos dos links contidos no arquivo .md, execute:
```
md-links <caminho-do-arquivo> --stats
```
<p><img src='./src/image/stats.PNG' alt="md-links --stats"></p>

**Validação e estatísticas dos links:** 
* Para validar links e gerar estatísticas de um arquivo Markdown, execute:
```
md-links <caminho-do-arquivo> --validate --stats
```
<p><img src='./src/image/validate-stats.PNG' alt="md-links --validate --stats"></p>


**Mensagens de erro**

Dependendo do comando que o usuário executar no terminal, as seguintes mensagens de erro podem ser geradas:
  * erro para um arquivo .md sem links
  * erro para a leitura de um arquivo que não é .md
  * erro para um arquivo inexistente

A partir do comando digitado, o terminal poderá retornar os seguintes erros: 

<img src='./src/image/arquivo-sem-links.PNG' alt="md-links error messages">
<img src='./src/image/extensão-nao-md.PNG' alt="md-links error messages">
<img src='./src/image/error.PNG' alt="md-links error messages">

## 5. Testes Unitários

Foram testadas as funções de ``` mdLinks ``` com testes das mensagens de erro, ``` validarLinks ```, ``` estatisticas ```, com a seguinte cobertura:  

<img src='./src/image/teste.PNG' alt="Unitary Tests" width='700'>  

## 6. Critérios Mínimos
* [x] Poder instalar via `npm install`

* [x] Guia de uso e instalação da biblioteca

* [x] Implementa `options.validate`

* [x] Possuir o executável `md-links` no path (configurado no `package.json`)

* [x] Executar sem erros e ter o resultado esperado

* [x] Implementar `--validate`

* [x] Implementar `--stats`

* [x] Os testes unitários devem cobrir no mínimo 70% dos statements, functions, lines e branches.

* [x] Rodar os testes `npm run test`.


## 7. Tecnologias utilizadas

<a href="https://github.com/"><img alt="GitHub Icon" height="45" src="https://cdn.icon-icons.com/icons2/2368/PNG/512/github_logo_icon_143772.png"/></a>
<a href="https://git-scm.com/"><img alt="Git Bash Icon" height="45" src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_git_icon_130581.png"/></a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/"><img alt="JavaScript Icon" height="40" src="https://cdn.icon-icons.com/icons2/2108/PNG/512/javascript_icon_130900.png"></a>
<a href="https://nodejs.org/"><img alt="Node.js Icon" height="45" src="https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_logo_icon_146409.png"/></a>
<a href="https://www.npmjs.com/"><img alt="Npm Icon" height="45" src="https://cdn.icon-icons.com/icons2/2407/PNG/512/npm_icon_146141.png"/></a>
<a href="https://www.figma.com/"><img alt="Figma Icon" height="45" src="https://cdn.icon-icons.com/icons2/2429/PNG/512/figma_logo_icon_147289.png"/></a>

## 8. Desenvolvedora
<img loading="lazy" src="https://avatars.githubusercontent.com/u/117682146?s=400&u=fb1bd6336cde2b5f4c0fd922206c20e89804b67b&v=4" width=115><br>
Isabela Tenório

* GitHub: [@isabelatenorio](https://github.com/belatenorio)
* Linkedin: [Isabela Tenório](https://www.linkedin.com/in/isabelatenorioadv/)
