-- Cria a tabela Produtos, cada produto possui um id (inteiro auto incremento), um nome (texto não nulo) e um id de categoria obrigatório (inteiro) e um preço obrigatório (decimal)

CREATE TABLE Produtos(
    ID INTEGER PRIMARY KEY,
    NOME VARCHAR NOT NULL,
    ID_CATEGORIA INT NOT NULL,
    PRECO FLOAT NOT NULL
);