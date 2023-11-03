const { mdLinks, validarLinks, estatisticas } = require('../src/md-links.js');

describe('mdLinks', () => {

  it('deveria extrair todos os links de um arquivo Markdow', () => {
    const caminhoDoArquivo = './src/files/teste.md';
    const links = [
      {
        texto: 'Markdown',
        href: 'https://pt.widown'
      },
      {
        texto: 'Markdown',
        href: 'https://pt.widown'
      },
      {
        texto: 'Node.js',
        href: 'https://nodejs.org/palomitalinda'
      },
      {
        texto: 'Node.js',
        href: 'https://nodejs.org/pt-br/'
      },
      {
        texto: 'Arranjos',
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays'
      },
      {
        texto: 'Array.prototype.reduce() - MDN',
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce'
      },
    ]

    return expect(mdLinks(caminhoDoArquivo)).resolves.toEqual(links);
  });
  it('deveria rejeitar um arquivo não encontrado', () => {
    const caminhoArquivo = './arquivoNaoEncontrado.md';
    mdLinks(caminhoArquivo)
    .catch((error) => {
      expect(error).toEqual({message: 'Arquivo não encontrado'});
    });
  });

  it('deveria rejeitar um arquivo sem links', () => {
    const arquivoSemLinks = './src/files/teste-zeroLinks.md';

    mdLinks(arquivoSemLinks)
    .catch((error) => {
      expect(error).toEqual({ message: 'Nenhum link encontrado dentro do arquivo' });
    });
  });
  it('deveria rejeitar um arquivo sem extensão md', () => {
    const caminhoArquivo = './src/files/teste.txt';

    mdLinks(caminhoArquivo)
    .catch((error) => {
      expect(error).toEqual({message: 'A extensão do arquivo não é .md'});
    });
  });
});

describe('validarLinks', () => {
  it('deveria retornar status entre 200 e 299 para um link válido', () => {
    const links = [
      {
        texto: 'teste 1',
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays'
      },
      {
        texto: 'teste 2',
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce'
      }
    ];
    const linkValido = [
      {
        texto: 'teste 1',
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
        status: 200,
        ok: 'ok'
      },
      {
        texto: 'teste 2',
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
        status: 200,
        ok: 'ok'
      }
    ];
    const mockedFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      })
    );

    global.fetch = mockedFetch;

    return validarLinks(links).then((result) => {
      expect(result).toEqual(linkValido);
    });
  });

  it('deveria retornar um status acima de 299 para um link inválido', () => {
    const links = [
      {
        texto: 'teste 1',
        href: 'https://nodejs.org/palomitalinda',
      },
      {
        texto: 'teste 2',
        href: 'https://nodejs.org/palomitalinda',
      }
    ];
    const linksInvalidos = [
      {
        texto: 'teste 1',
        href: 'https://nodejs.org/palomitalinda',
        status: 404,
        ok: 'fail'
      },
      {
        texto: 'teste 2',
        href: 'https://nodejs.org/palomitalinda',
        status: 404,
        ok: 'fail'
      }
    ];
    const mockedFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404
      })
    );

    global.fetch = mockedFetch;

    return validarLinks(links).then((result) => {
      expect(result).toEqual(linksInvalidos);
    });
  });
  it('deveria rejeitar um link que não existe', () => {
    const links = [
      {
        texto: 'Markdown',
        href: 'https://pt.widown'
      },
      {
        texto: 'Markdown',
        href: 'https://pt.widown',
        
      }
    ];
    const linksInexistentes = [
      {
        texto: 'Markdown',
        href: 'https://pt.widown',
        ok: 'fail'
      },
      {
        texto: 'Markdown',
        href: 'https://pt.widown',
        ok: 'fail'
      }
    ];

    const mockedFetch = jest.fn(() =>
      Promise.reject(new Error('Erro simulado'))
    );
    global.fetch = mockedFetch;
    return validarLinks(links).then((result) => {
      expect(result).toEqual(linksInexistentes);
    });
  });
});

describe('estatisticas', () => {
  it('deveria informar as estatisticas de um array de links', () => {
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