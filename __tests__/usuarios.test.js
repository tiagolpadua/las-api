const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario.js");
describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const res = await request.get("/usuarios");
    expect(res.body).toEqual([
      { id: 1, nome: "lucas", urlFotoPerfil: null },
      {
        id: 3,
        nome: "nomee",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
      },
      {
        id: 4,
        nome: "marcos",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      },
      {
        id: 5,
        nome: "m",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      },
    ]);
  });
  test("Adicionar Usuário com Dados Válidos", async () => {
    const res = await request.post("/usuarios").send({
      nome: "nomee",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      id: 3,
      nome: "nomee",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
  });
  test("Valida POST Nome Inválido ou Repetido", async () => {
    const resNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(resNomeInvalido.statusCode).toBe(400);
    expect(resNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });

  test("Valida POST URL Inválida", async () => {
    const resNomeInvalido = await request.post("/usuarios").send({
      nome: "nomee",
      urlFotoPerfil: "XXXXXXXXX",
    });
    expect(resNomeInvalido.statusCode).toBe(400);
    expect(resNomeInvalido.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  test("Altera Usuário", async () => {
    const res = await request.put("/usuarios/3");
    expect(res.statusCode).toBe(404);
  });

  test("Buscar Usuário por Id Existente", async () => {
    const res = await request.get("/usuarios/3");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, nome: "lucas", urlFotoPerfil: null },
      {
        id: 3,
        nome: "nomee",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
      },
      {
        id: 4,
        nome: "marcos",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      },
      {
        id: 5,
        nome: "m",
        urlFotoPerfil: "https://randomuser.me/api/portraits/women/55.jpg",
      },
    ]);
  });
  test("Buscar Usuário por Id Inexistente", async () => {
    const res = await request.get("/usuarios/99");
    expect(res.statusCode).toBe(404);
  });

  test("Buscar Usuário por Nome Existente", async () => {
    const res = await request.get("/usuarios/nome/lucas");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, nome: "lucas", urlFotoPerfil: null }]);
  });
  test("Buscar Usuário por Nome Inexistente", async () => {
    const res = await request.get("/usuarios/nome/xxx");
    expect(res.statusCode).toBe(404);
  });
  test("Apaga Usuários Existente", async () => {
    const res = await request.delete("/usuarios/5");
    expect(res.statusCode).toBe(204);
  });
  test("Apaga Usuários Inexistente", async () => {
    const res = await request.delete("/usuarios/99");
    expect(res.statusCode).toBe(404);
  });
});
