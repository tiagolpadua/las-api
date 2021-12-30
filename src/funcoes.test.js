const { saudar, extrairPrimeiroNome, capitalizar, calculaImposto, calculaDesconto, truncar, validaTextoPreenchido, validaData } = require('./funcoes');

describe('Essencial', () => {
    test('Deve saudar um usuário.', () => {
        expect(saudar("Tiago")).toBe("Olá, Tiago");
    });

    test('Deve extrair o primeiro nome.', () => {
        expect(extrairPrimeiroNome("Tiago Lage Payne de Pádua")).toBe("Tiago");
    });

    test('Deve capitalizar uma palavra.', () => {
        expect(capitalizar("mArIa")).toBe("Maria");
    });

    test('Deve calcular o imposto de um preço e categoria fornecidos.', () => {
        expect(calculaImposto(30, "Alimentação")).toBe(0);
        expect(calculaImposto(10, "Bebida")).toBe(1);
    });

    test('Deve calcular o desconto de um preço, categoria e cupom fornecidos.', () => {
        expect(calculaDesconto(30, "Alimentação", "NULABSSA")).toBe(15);
        expect(calculaDesconto(10, "Bebida", "NULABSSA")).toBe(10);
        expect(calculaDesconto(30, "Alimentação", "XPTO")).toBe(30);
        expect(calculaDesconto(10, "Bebida", "XPTO")).toBe(10);
    });
});

describe('Desejável', () => {
    test('Deve validar se o texto está preenchido.', () => {
        expect(validaTextoPreenchido("")).toBeUndefined();
        expect(validaTextoPreenchido("    ")).toBeUndefined();
        expect(validaTextoPreenchido("    Maria ")).toBe("Maria");
    });

    test('Deve truncar uma palavra maior que o comprimento máximo.', () => {
        expect(truncar("Fulano", 4)).toBe("Fula...");
    });

    test('O comprimento padrão do truncamento deve ser 5.', () => {
        expect(truncar("Fulano")).toBe("Fulan...");
    });

    test('Não deve truncar palavras menores que o comprimento máximo.', () => {
        expect(truncar("Fulano", 20)).toBe("Fulano");
    });
});

describe('Desafio', () => {
    test('Deve validar uma data correta.', () => {
        expect(validaData("01/03/2000")).toBeTruthy();
        expect(validaData("01/12/2000")).toBeTruthy();
        expect(validaData("30/12/2000")).toBeTruthy();
    });

    test('Deve recusar datas inválidas.', () => {
        expect(validaData("99/03/2000")).toBeNaN();
        expect(validaData("teste123")).toBeNaN();
        expect(validaData("12/30/2000")).toBeNaN();
    });
});