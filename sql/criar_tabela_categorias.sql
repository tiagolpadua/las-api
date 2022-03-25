-- Cria a tabela Categorias, cada categoria possui um id (inteiro auto incremento chave primária), um nome (texto, não nulo) e um desconto associado (valor decimal)
CREATE TABLE Categorias (
    ID INTEGER AUTO_INCREMENT PRIMARY KEY ,
    NOME VARCHAR NOT NULL,
    DESCONTO FLOAT
);