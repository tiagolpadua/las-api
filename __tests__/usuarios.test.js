const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");
const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API De Usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Pedro",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
        nomeCompleto: "alex Silva",
        dataNascimento: "1988-04-27T03:00:00.000Z",
        rg: "1516171819",
        cpf: "11911923945",
        telefone: "7132988888",
        celular: "71988888888",
        email: "alex@alex.com.br",
        senha: "12345",
        cep: "42374508",
        endereco: "Rua Sil",
        numero: 123,
        complemento: "",
        bairro: "Lauis ",
      },
    ]);
  });

  test("Buscar usuário por id existente", async () => {
    const resp = await request.get("/usuarios/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        id: 1,
        nome: "Pedro",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/91.jpg",
        nomeCompleto: "alex Silva",
        dataNascimento: "1988-04-27T03:00:00.000Z",
        rg: "1516171819",
        cpf: "11911923945",
        telefone: "7132988888",
        celular: "71988888888",
        email: "alex@alex.com.br",
        senha: "12345",
        cep: "42374508",
        endereco: "Rua Sil",
        numero: 123,
        complemento: "",
        bairro: "Lauis ",
      });
  });

  test("Buscar usuário por id inexistente", async () => {
    const resp = await request.get("/usuarios/9999");
    expect(resp.statusCode).toBe(404);
    });

    test("Adicionar usuário com dados válidos", async () => {
      const resp = await request.post("/usuarios").send({
        nome: "Lucas",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/90.jpg"
      });
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({
        id: 99,
        nome: "Lucas",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/90.jpg"
      });
      });  
  

  test("Adicionar usuário com dados inválidos", async () => {
    const respJaUtilizado = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/90.jpg"
    });
    expect(respJaUtilizado.statusCode).toBe(400);
    expect(respJaUtilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false
      }
    ]);
    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/90.jpg"
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false
      }
    ]);

    const respURLInvalida = await request.post("/usuarios").send({
      nome: "Lucas",
      urlFotoPerfil:"xxxxxxxxxx",
    });
    expect(respURLInvalida.statusCode).toBe(400);
    expect(respURLInvalida.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false
      }
    ]);
    });  

    test ("Buscar usuário por nome existente", async () => {
      const resp = await request.get("/usuarios/nome/Pedro");
      expect(resp.statusCode).toBe(200);
    });

    test ("Buscar usuário por nome inexistente", async () => {
      const resp = await request.get("/usuarios/nome/Pedroxx");
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual([]);
    });


  });


  