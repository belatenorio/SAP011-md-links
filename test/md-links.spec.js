const { mdLinks, validarLinks, estatisticas } = require('../src/md-links.js');

describe('mdLinks', () => {

  it('deveria extrair todos os links de um arquivo Markdow', () => {
    const caminhoDoArquivo = './teste.md';
    const links = [
      {
        href: 'https://nodejs.org/palomitalinda',
        texto: 'teste 1'

      },
      {
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
        texto: 'teste 2'
      },
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        texto: 'teste 4'
      }
    ]

    mdLinks(caminhoDoArquivo)
      .then((result) => expect(result).toEqual(links));

  })
})

describe('estatisticas', () => {
  it('deve informar as estatisticas de um array de links', () => {
    const arrayDeLinks = [
      {
        texto: 'teste 1',
        href: 'https://nodejs.org/palomitalinda',
        status: 404,
        ok: 'FAIL'
      },
      {
        texto: 'teste 2',
        href: 'https://nodejs.org/palomitalinda',
        status: 404,
        ok: 'FAIL'
      },
      {
        texto: 'teste 3',
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
        status: 200,
        ok: 'OK'
      },
      {
        texto: 'teste 4',
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        status: 200,
        ok: 'OK'
      }
    ]

    const resultado = {
      contarLinks: 4,
      linksUnicos: 3,
      linksQuebrados: 2,
    };

    expect(estatisticas(arrayDeLinks)).toEqual(resultado);
  });
});

//mockar só o feth()