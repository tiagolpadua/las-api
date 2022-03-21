const DAO = require("./dao");
const fs = require("fs");

describe("Essencial", () => {
  let dao;

  beforeEach(async () => {
    dao = new DAO();
    await dao.open();
  });

  afterEach(async () => {
    await dao.close();
  });

  // Escreva um SQL que cria a tabela Categorias, cada categoria possui um id (inteiro auto incremento chave primária), um nome (texto, não nulo) e um desconto associado (valor decimal)
  test("Deve criar a tabela de categorias", async () => {
    const sqlCriarTabelaCategorias = fs.readFileSync(
      "sql/criar_tabela_categorias.sql",
      "utf8"
    );

    await dao.run(sqlCriarTabelaCategorias);

    const rows = await dao.all("pragma table_info('CATEGORIAS');");

    expect(rows.map((r) => r.name)).toEqual(["ID", "NOME", "DESCONTO"]);
  });

  // Escreva um SQL que cria a tabela Cupons, cada cupom possui um id (inteiro auto incremento), um nome (texto) e um desconto associado (valor decimal não nulo)
  test("Deve criar a tabela de cupons", async () => {
    const sqlCriarTabelaCupons = fs.readFileSync(
      "sql/criar_tabela_cupons.sql",
      "utf8"
    );

    await dao.run(sqlCriarTabelaCupons);

    const rows = await dao.all("pragma table_info('CUPONS');");

    expect(rows.map((r) => r.name)).toEqual(["ID", "NOME", "DESCONTO"]);
  });

  // Escreva um SQL que cria a tabela Produtos, cada produto possui um id (inteiro auto incremento), um nome (texto) e um id de categoria obrigatório (inteiro) e um preço (decimal obrigatório)
  test("Deve criar a tabela de produtos", async () => {
    const sqlCriarTabelaProdutos = fs.readFileSync(
      "sql/criar_tabela_produtos.sql",
      "utf8"
    );

    await dao.run(sqlCriarTabelaProdutos);

    const rows = await dao.all("pragma table_info('PRODUTOS');");

    expect(rows.map((r) => r.name)).toEqual([
      "ID",
      "NOME",
      "ID_CATEGORIA",
      "PRECO",
    ]);
  });
});

describe("Desejável", () => {
  let dao;

  beforeEach(async () => {
    dao = new DAO();
    await dao.open();
  });

  afterEach(async () => {
    await dao.close();
  });

  // Escreva um SQL que apaga a tabela de categorias
  test("Deve apagar a tabela de categorias", async () => {
    const sqlCriarTabelaCategorias = fs.readFileSync(
      "sql/criar_tabela_categorias.sql",
      "utf8"
    );

    await dao.run(sqlCriarTabelaCategorias);

    const sqlApagarTabelaCategorias = fs.readFileSync(
      "sql/apagar_tabela_categorias.sql",
      "utf8"
    );

    await dao.run(sqlApagarTabelaCategorias);

    const rows = await dao.all("pragma table_info('CATEGORIAS');");

    expect(rows).toEqual([]);
  });

  // Escreva um SQL que insere dois produtos na tabela produtos:
  // Nome: Coca-cola, Categoria: 2, Preço: 5,50
  // Nome: Serpentina, Categoria: 1, Preço: 3,00
  test("Deve incluir produtos", async () => {
    const sqlCriarTabelaProdutos = fs.readFileSync(
      "sql/criar_tabela_produtos.sql",
      "utf8"
    );

    await dao.run(sqlCriarTabelaProdutos);

    const sqlInsereProdutos = fs.readFileSync(
      "sql/insere_produtos.sql",
      "utf8"
    );

    await dao.run(sqlInsereProdutos);

    let rows = await dao.all("SELECT * FROM PRODUTOS;");

    expect(rows).toEqual([
      {
        ID: 1,
        ID_CATEGORIA: 2,
        NOME: "Coca-cola",
        PRECO: 5.5,
      },
      {
        ID: 2,
        ID_CATEGORIA: 1,
        NOME: "Serpentina",
        PRECO: 3,
      },
    ]);
  });

  // Escreva um SQL que altera todas as categorias com desconto de 10% para 20%
  test("Deve alterar o desconto das categorias", async () => {
    const sqlCriarTabelaCategorias = fs.readFileSync(
      "sql/criar_tabela_categorias.sql",
      "utf8"
    );
    await dao.run(sqlCriarTabelaCategorias);

    await dao.run(
      `
      INSERT INTO
        CATEGORIAS('NOME', 'DESCONTO')
        VALUES
          ('Alimentação', 10),
          ('Infantil', 10),
          ('Bebida', 5);
      `
    );

    const sqlAlterarDescontosCategorias = fs.readFileSync(
      "sql/alterar_descontos_categorias.sql",
      "utf8"
    );
    await dao.run(sqlAlterarDescontosCategorias);

    let rows = await dao.all("SELECT NOME FROM CATEGORIAS WHERE DESCONTO=20;");

    expect(rows).toEqual([
      {
        NOME: "Alimentação",
      },
      {
        NOME: "Infantil",
      },
    ]);
  });

  // Escreva um SQL que exclua a categoria 'Infantil'
  test("Deve excluir a categoria Infantil", async () => {
    const sqlCriarTabelaCategorias = fs.readFileSync(
      "sql/criar_tabela_categorias.sql",
      "utf8"
    );
    await dao.run(sqlCriarTabelaCategorias);

    await dao.run(
      `
      INSERT INTO
        CATEGORIAS('NOME', 'DESCONTO')
        VALUES
          ('Alimentação', 10),
          ('Infantil', 10),
          ('Bebida', 5);
      `
    );

    const sqlExcluiCategoriaInfantil = fs.readFileSync(
      "sql/excluir_categoria_infantil.sql",
      "utf8"
    );
    await dao.run(sqlExcluiCategoriaInfantil);

    let rows = await dao.all("SELECT NOME FROM CATEGORIAS;");

    expect(rows).toEqual([
      {
        NOME: "Alimentação",
      },
      {
        NOME: "Bebida",
      },
    ]);
  });
});

describe("Desafio", () => {
  let dao;

  beforeEach(async () => {
    dao = new DAO();
    await dao.open();
  });

  afterEach(async () => {
    await dao.close();
  });

  // Escreva um SQL que filtre os nomes das categorias com desconto entre 5% e 25%
  test("Deve filtrar os nomes das categorias", async () => {
    const sqlCriarTabelaCategorias = fs.readFileSync(
      "sql/criar_tabela_categorias.sql",
      "utf8"
    );
    await dao.run(sqlCriarTabelaCategorias);

    await dao.run(
      `
      INSERT INTO
        CATEGORIAS('NOME', 'DESCONTO')
        VALUES
          ('Adulto', 0),
          ('Infantil', 25),
          ('Alimentação', 9),
          ('Bebida', 2);
      `
    );

    const sqlFiltrarCategorias = fs.readFileSync(
      "sql/filtrar_categorias.sql",
      "utf8"
    );

    let rows = await dao.all(sqlFiltrarCategorias);

    expect(rows).toEqual([
      {
        NOME: "Infantil",
      },
      {
        NOME: "Alimentação",
      },
    ]);
  });

  // Escreva um SQL que filtre o preço dos produtos que o nome começa pela letra C
  test("Deve filtrar os preço dos produtos", async () => {
    const sqlCriarTabelaProdutos = fs.readFileSync(
      "sql/criar_tabela_produtos.sql",
      "utf8"
    );

    await dao.run(sqlCriarTabelaProdutos);

    await dao.run(
      `
      INSERT INTO
      PRODUTOS('NOME', 'ID_CATEGORIA', 'PRECO')
        VALUES
          ('Coca-cola', 2, 5.5),
          ('Serpentina', 1, 3.0),
          ('Cachorro-Quente', 1, 3.0),
          ('Cocada', 1, 1.5),
          ('Soda Limonada', 2, 2.0);
      `
    );

    const sqlFiltrarProdutos = fs.readFileSync(
      "sql/filtrar_produtos.sql",
      "utf8"
    );

    let rows = await dao.all(sqlFiltrarProdutos);

    expect(rows).toEqual([
      {
        PRECO: 5.5,
      },
      {
        PRECO: 3,
      },
      {
        PRECO: 1.5,
      },
    ]);
  });
});
