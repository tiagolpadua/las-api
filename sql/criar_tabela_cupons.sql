/* Escreva um SQL que cria a tabela Cupons, cada cupom possui um id (inteiro auto incremento), 
um nome (texto não nulo) e um desconto associado (valor decimal não nulo)*/
CREATE TABLE Cupons (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME TEXT NOT NULL,
    DESCONTO REAL NOT NULL
);