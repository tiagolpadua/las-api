const supertest = require("supertest");
const app = require("../../src/config/customExpress");
const request = supertest(app());
const usuarios = require("../../mocks/usuarios.json");

jest.mock("../../src/repositorios/usuario.js");

describe("testa GET /usuarios", () => {
  it("Deve Listar usuarios", async () => {
    const listaDeUsuarios = [usuarios[0], usuarios[1], usuarios[2]];
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(listaDeUsuarios);
  });
  it("Deve buscar usuario pelo NOME", async () => {
    const resp = await request.get("/usuarios/nome/Lilian");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuarios[0]);
  });
  it("Não deve achar usuario com NOME não cadastrado", async () => {
    const resp = await request.get("/usuarios/nome/fooo");
    expect(resp.statusCode).toBe(404);
  });

  it("Deve buscar usuario pelo ID", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuarios[1]);
  });

  it("Não deve achar usuario com ID inexistente ", async () => {
    const resp = await request.get("/usuarios/99");
    expect(resp.statusCode).toBe(404);
  });

  it("Deve buscar endereco pelo ID", async () => {
    const resp = await request.get("/usuarios/3/endereco");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      cep: "72980000",
      endereco: "Rua C",
      numero: 56,
      complemento: "Apartamento 12",
      bairro: "Zona Norte",
    });
  });

  it("Não deve achar endereco pelo ID inexistente", async () => {
    const resp = await request.get("/usuarios/99/endereco");
    expect(resp.statusCode).toBe(500);
  });

  it("Deve buscar contatos pelo ID", async () => {
    const resp = await request.get("/usuarios/3/contatos");
    expect(resp.statusCode).toBe(200);
  });

  it("Não deve achar contatos pelo ID inexistente", async () => {
    const resp = await request.get("/usuarios/99/contatos");
    expect(resp.statusCode).toBe(500);
  });

  it("Deve buscar dados-pessoais pelo ID", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      dataNascimento: "2000-01-01",
      nomeCompleto: "Fulana de Tal",
      rg: "123321 SSP BA",
      cpf: "97551353089",
    });
  });

  it("Não deve achar dados-pessoais pelo ID inexistente", async () => {
    const resp = await request.get("/usuarios/99/dados-pessoais");
    expect(resp.statusCode).toBe(500);
  });
});

describe("Testa POST /usuarios", () => {
  it("Cria usuarios com dados válidos com sucesso", async () => {
    const novoUsuario = usuarios[3];
    const resp = await request.post("/usuarios").send(novoUsuario);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ ...novoUsuario, id: 5 });
  });

  it("Nao cria novo usuario com dados inválidos ", async () => {
    const resp = await request.post("/usuarios").send("foo");
    expect(resp.statusCode).toBe(500);
  });
});

describe("testa PUT /usuarios", () => {
  it("deve alterar dados pelo ID", async () => {
    const resp = await request.put("/usuarios/1").send({ ...usuarios });
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve alterar dados pelo ID inválido", async () => {
    const resp = await request.put("/usuarios/99").send({ ...usuarios });
    expect(resp.statusCode).toBe(500);
  });

  it("Não deve alterar dados com ID invalido", async () => {
    const resp = await request.put("/usarios/99").send({ ...usuarios });
    expect(resp.statusCode).toBe(404);
  });

  it("deve alterar contatos pelo ID", async () => {
    const resp = await request
      .put("/usuarios/1/contatos")
      .send({ telefone: 12345, celular: 99779954, email: "dddd@llala.com" });
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve alterar contatos com ID invalido", async () => {
    const resp = await request
      .put("/usarios/99/contatos")
      .send({ ...usuarios });
    expect(resp.statusCode).toBe(404);
  });

  it("deve alterar senha pelo ID", async () => {
    const resp = await request.put("/usuarios/1/senha").send({ ...usuarios });
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve alterar senha com ID invalido", async () => {
    const resp = await request.put("/usarios/9/senha").send({ ...usuarios });
    expect(resp.statusCode).toBe(404);
  });

  it("deve alterar endereco pelo ID", async () => {
    const resp = await request
      .put("/usuarios/1/endereco")
      .send({ ...usuarios });
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve alterar endereco com ID invalido", async () => {
    const resp = await request
      .put("/usarios/99/endereco")
      .send({ ...usuarios });
    expect(resp.statusCode).toBe(404);
  });
  it("Deve alterar dados-pessoais pelo ID", async () => {
    const resp = await request
      .put("/usuarios/1/dados-pessoais")
      .send({ ...usuarios });
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve alterar dados-pessoais com ID invalido", async () => {
    const resp = await request
      .put("/usarios/99/dados-pessoais")
      .send({ ...usuarios });
    expect(resp.statusCode).toBe(404);
  });
});

describe("testa DELETE /usuarios", () => {
  it("deve excluir usuario pelo ID", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(204);
  });

  it("Não deve excluir usuario pelo ID inexistente", async () => {
    const resp = await request.delete("/usarios/99/endereco");
    expect(resp.statusCode).toBe(404);
  });
});
