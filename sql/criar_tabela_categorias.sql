CREATE TABLE Categorias(
	ID int identity primary key,
    NOME text not null,
    DESCONTO decimal
);

SELECT Categorias