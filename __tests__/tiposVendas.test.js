const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/tiposVendas");

describe("API de Tipos de Vendas", () => {
  test("Listar Tipos de Vendas", async () => {
    const resp = await request.get("/tipos-vendas");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "id": 1,
        "descricao": "Bebidas"
      },
      {
        "id": 2,
        "descricao": "Alimentação"
      },
      {
        "id": 3,
        "descricao": "Abadá/Ingressos"
      }
    ]);
  });

  test("Buscar tipo de venda existente", async () => {
    const resp = await request.get("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id": 1,
        "descricao": "Bebidas"
      }
    );
  });

  test("Buscar tipo de venda inexistente", async () => {
    const resp = await request.get("/tipos-vendas/9999");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar tipo de venda válido", async () => {
    const resp = await request.post("/tipos-vendas").send({
      "descricao": "Camarote"
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      "descricao": "Camarote"
    });
  });

  // test("Alterar tipo de venda", async () => {
  //   const resp = await request.put("/tipos-vendas/2").send({
  //     "descricao": "Camarote"
  //   });
  //   expect(resp.statusCode).toBe(500);
  //   expect(resp.body).toEqual(
  //     {
  //       "id": 2,
  //       "descricao": "Camarote"
  //     }
  //   );
  // });

  test("Excluir evento", async () => {
    const resp = await request.delete("/tipos-vendas/1");
    expect(resp.statusCode).toBe(200);
  });
});