--// Escreva um SQL que cria a tabela Produtos, cada produto 
-- possui um id (inteiro auto incremento), um nome (texto não nulo) 
-- e um id de categoria obrigatório (inteiro) e um preço obrigatório (decimal)


CREATE TABLE produtos(
ID INTEGER  PRIMARY KEY AUTOINCREMENT, 
NOME TEXT NOT NULL,
ID_CATEGORIA REAL NOT NULL,
--FOREIGN KEY(ID_CATEGORIA) REFERENCES categorias(ID)
PRECO REAL NOT NULL
);