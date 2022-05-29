const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
jest.mock("../src/repositorios/usuario");

describe("API usuarios", () => {
  test("Listar Usuarios", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Catia",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
      },
      {
        id: 2,
        nome: "Ciro junior",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
      },
    ]);
  });

  test("Buscar usuario por id existente", async () => {
    const resp = await request.get("/usuarios/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Catia",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
  });

  test("Buscar usuario por id inexistente", async () => {
    const resp = await request.get("/usuarios/11");
    expect(resp.statusCode).toBe(404);
  });

  test("Adicionar usuario valido", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Caue Malik",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/88.jpg",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      nome: "Caue Malik",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/88.jpg",
    });
  });

  test("Adicionar usuario nome invalido", async () => {
    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/88.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        nome: "nome",
        valido: false,
        mensagem: "Nome deve ser informado e deve ser único",
      },
    ]);
    const respNomeRepetido = await request.post("/usuarios").send({
      nome: "Catia",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
    expect(respNomeRepetido.statusCode).toBe(400);
    expect(respNomeRepetido.body).toEqual([
      {
        nome: "nome",
        valido: false,
        mensagem: "Nome deve ser informado e deve ser único",
      },
    ]);
    const respUrlInvalido = await request.post("/usuarios").send({
      nome: "Maria",
      urlFotoPerfil: "xxxxxxxxxxxxx",
    });
    expect(respUrlInvalido.statusCode).toBe(400);
    expect(respUrlInvalido.body).toEqual([
      {
        nome: "urlFotoPerfil",
        valido: false,
        mensagem: "URL deve uma URL válida",
      },
    ]);
  });

  test("Alterar usuario por id existente", async () => {
    const respAlterar = await request.put("/usuarios/1");
    expect(respAlterar.statusCode).toBe(200);
  });

  test("Deletar usuario por id existente", async () => {
    const respDeletar = await request.delete("/usuarios/2");
    expect(respDeletar.statusCode).toBe(200);
  });
  test("Buscar usuario por nome existente", async () => {
    const resp = await request.get("/usuarios/nome/Catia");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 1,
      nome: "Catia",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
    });
  });

  test("Buscar usuario por nome inexistente", async () => {
    const resp = await request.get("/usuarios/nome/Mariane");
    expect(resp.statusCode).toBe(404);
  });

  test("Buscar dados por id existente", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
  });

  test("Alterar dados pessoais por id existente", async () => {
    const respAlterar = await request.put("/usuarios/1/dados-pessoais");
    expect(respAlterar.statusCode).toBe(200);
  });
  test("Buscar contatos por id existente", async () => {
    const resp = await request.get("/usuarios/1/contatos");
    expect(resp.statusCode).toBe(200);
  });
  test("Alterar contatos por id existente", async () => {
    const respAlterar = await request.put("/usuarios/1/contatos");
    expect(respAlterar.statusCode).toBe(200);
  });
  test("Buscar endereco por id existente", async () => {
    const resp = await request.get("/usuarios/1/endereco");
    expect(resp.statusCode).toBe(200);
  });
  test("Alterar endereco por id existente", async () => {
    const respAlterar = await request.put("/usuarios/1/endereco");
    expect(respAlterar.statusCode).toBe(200);
  });
  test("Alterar senha por id existente", async () => {
    const respAlterar = await request.put("/usuarios/1/senha");
    expect(respAlterar.statusCode).toBe(200);
  });
});
