const supertest = require("supertest");
const app = require("../../src/config/customExpress");
const request = supertest(app());
const usuarios = require("../../mocks/usuarios.json");

jest.mock("../../src/repositorios/usuario.js");

describe("testa GET /usuarios", () => {
  it("Deve Listar usuarios", async () => {
    const listaDeUsuarios = usuarios;
    usuarios.pop();
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(listaDeUsuarios);
  });

  it("Deve buscar usuario pelo NOME", async () => {
    const resp = await request.get("/usuarios/nome/Lilian");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuarios[0]);
  });

  it("Deve buscar usuario pelo ID", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuarios[1]);
  });

  it("Deve buscar endereco pelo ID", async () => {
    const resp = await request.get("/usuarios/3/endereco");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuarios[2].endereco);
  });

  it("Deve buscar contatos pelo ID", async () => {
    const resp = await request.get("/usuarios/nome/Marcos");
    expect(resp.statusCode).toBe(200);
  });

  it("Deve buscar dados-pessoais pelo ID", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
  });
});

describe("Testa POST /usuarios", () => {
  const novoUsuario = usuarios[3];
  it("Cria usuarios com dados válidos com sucesso", async () => {
    const resp = await request.post("/usuarios").send(novoUsuario);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ ...novoUsuario, id: 4 });
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

  it("deve alterar contatos pelo ID", async () => {
    const resp = await request
      .put("/usuarios/1/contatos")
      .send({ telefone: 12345, celular: 99779954, email: "dddd@llala.com" });
    expect(resp.statusCode).toBe(204);
  });

  it("deve alterar senha pelo ID", async () => {
    const resp = await request.put("/usuarios/1/senha").send();
    expect(resp.statusCode).toBe(204);
  });

  it("deve alterar endereco pelo ID", async () => {
    const resp = await request.put("/usuarios/1/endereco").send();
    expect(resp.statusCode).toBe(204);
  });
});

describe("testa DELETE /usuarios", () => {
  it("deve excluir usuario pelo id", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(204);
  });
});
