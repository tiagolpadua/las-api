const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const rotas = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("Testa API tipos-vendas GET", () => {
  test("API de tipos-vendas", async () => {
    const response = await rotas.get("/tipos-vendas");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        descricao: "Bebidas",
      },
      {
        id: 2,
        descricao: "Alimentação",
      },
      {
        id: 3,
        descricao: "Abadá / Ingressos",
      },
    ]);
  });

  // Buscas por ID

  test("Retorna Eventos por ID existente", async () => {
    const response = await rotas.get("/tipos-vendas/2");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 2,
      descricao: "Alimentação",
      descrição: "Operação bem sucedida",
    });
  });

  test("Retorna Eventos por ID inexistente", async () => {
    const response = await rotas.get("/tipos-vendas/45454");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("TiposVendas não encontrado");
  });

  test("Retorna Eventos por ID inválido", async () => {
    const response = await rotas.get("/tipos-vendas/kkkk");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Id inválido fornecido");
  });

  // FIM Buscas por ID
});

describe("Testa API tiposVendas POST", () => {
  test("Adicionar eventos com dados válidos", async () => {
    const response = await rotas.post("/tipos-vendas").send({
      id: 4,
      descricao: "infantil",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 4,
      descricao: "infantil",
      status: "Tipo de venda incluída com sucesso",
    });
  });

  test("Adicionar eventos com dados inválidos", async () => {
    const response = await rotas.post("/tipos-vendas").send({
      id: 4,
      descricao: "in",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: [
        {
          nome: "nomeTipoVenda",
          mensagem: "tipoVenda deve ter pelo menos cinco caracteres",
          resultado: true,
        },
      ],
      status: "Entrada inválida",
    });
  });

  test("Adicionar eventos com descrição existente", async () => {
    const response = await rotas.post("/tipos-vendas").send({
      id: 3,
      descricao: "Bebidas",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: [
        {
          nome: "existeVenda",
          mensagem: "tipoVenda já existe na base de dados",
          resultado: true,
        },
      ],
      status: "Entrada inválida",
    });
  });
});

describe("Testa API TIPO-VENDAS PUT", () => {
  test("Atualiza tipoVendas com dados válidos", async () => {
    const response = await rotas.put("/tipos-vendas/1").send({
      descricao: "Bebidas",
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  test("Atualiza tipoVendas com dados inválidos", async () => {
    const response = await rotas.put("/tipos-vendas/1").send({
      descricao: "Beb",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({
      erro: [
        {
          nome: "nomeTipoVenda",
          mensagem: "tipoVenda deve ter pelo menos cinco caracteres",
          resultado: true,
        },
      ],
      status: "Entrada inválida",
    });
  });

  test("Atualiza tipoVendas com dados inválidos", async () => {
    const response = await rotas.put("/tipos-vendas/5").send({
      descricao: "Bebidas",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: "TiposVendas não encontrado",
    });
  });
});

describe("Testa API TiposVendas DELETE", () => {
  test("Apaga usuário na base de dados", async () => {
    const response = await rotas.delete("/tipos-vendas/1");

    expect(response.statusCode).toBe(204);
  });

  test("Apaga usuário na base de dados com id inválido", async () => {
    const response = await rotas.delete("/tipos-vendas/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("TipoVenda não encontrado");
  });

  test("Apaga usuário na base de dados com id inválido", async () => {
    const response = await rotas.delete("/tipos-vendas/kkkkk");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Id inválido fornecido");
  });
});
