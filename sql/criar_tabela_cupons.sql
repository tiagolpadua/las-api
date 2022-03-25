-- Cria a tabela Cupons, cada cupom possui um id (inteiro auto incremento), um nome (texto não nulo) e um desconto associado (valor decimal não nulo)

CREATE TABLE Cupons (
    ID INTEGER AUTO_INCREMENT,
    NOME VARCHAR NOT NULL,
    DESCONTO FLOAT NOT NULL
);