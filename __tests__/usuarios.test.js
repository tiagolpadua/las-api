const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuario");

describe("API de Usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        nome: "Izaque",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
        nomeCompleto: "Izaque farias",
        dataNascimento: "1987-04-27T03:00:00.000Z",
        rg: "12365411",
        cpf: "12365478911",
        telefone: "7133011581",
        celular: "71991895189",
        email: "zac@email.com",
        senha: "passaporte",
        cep: "40000000",
        endereco: "rua vitor",
        numero: 6,
        complemento: "sem",
        bairro: "garcia",
      },
      {
        id: 2,
        nome: "Isabela",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
        nomeCompleto: "Isabela Souza",
        dataNascimento: "1992-05-30T03:00:00.000Z",
        rg: "78965412",
        cpf: "98745632199",
        telefone: "7133017310",
        celular: "71991895189",
        email: "bela@email.com",
        senha: "liberado",
        cep: "40000000",
        endereco: "rua vitor",
        numero: 6,
        complemento: "sem",
        bairro: "garcia",
      },
      {
        id: 3,
        nome: "Zara",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
        nomeCompleto: "Zara Souza Farias",
        dataNascimento: "2021-07-24T03:00:00.000Z",
        rg: "78965412",
        cpf: "65498732199",
        telefone: "7133011581",
        celular: "71991895666",
        email: "zara@mail.com",
        senha: "livre",
        cep: "4000000",
        endereco: "rua vitor",
        numero: 6,
        complemento: "sem",
        bairro: "garcia",
      },
    ]);
  });

  test("Buscar usuário por um id existente", async () => {
    const resp = await request.get("/usuarios/2");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      id: 2,
      nome: "Isabela",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
      nomeCompleto: "Isabela Souza",
      dataNascimento: "1992-05-30T03:00:00.000Z",
      rg: "78965412",
      cpf: "98745632199",
      telefone: "7133017310",
      celular: "71991895189",
      email: "bela@email.com",
      senha: "liberado",
      cep: "40000000",
      endereco: "rua vitor",
      numero: 6,
      complemento: "sem",
      bairro: "garcia",
    });
  });
  test("Buscar usuário por um id inexistente", async () => {
    const resp = await request.get("/usuarios/999");
    expect(resp.statusCode).toBe(404);
  });
  test("Adicionar usuário com dados válidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Marcos",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id: 99,
      nome: "Marcos",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
    });
  });
  test("Adicionar usuário com dados inválidos", async () => {
    const respNomeInvalido = await request.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
    });
    expect(respNomeInvalido.statusCode).toBe(400);
    expect(respNomeInvalido.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respNomeJautilizado = await request.post("/usuarios").send({
      nome: "Zara",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
    });
    expect(respNomeJautilizado.statusCode).toBe(400);
    expect(respNomeJautilizado.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);

    const respURLInvalida = await request.post("/usuarios").send({
      nome: "Marcos",
      urlFotoPerfil: "xxxxxxxxxxxxxxxxxxxx",
    });
    expect(respURLInvalida.statusCode).toBe(400);
    expect(respURLInvalida.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });
  test("Alterar usuário", async () => {
    const res = await request.put("/usuarios/3").send({
      id: 3,
      nome: "Zara",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
      nomeCompleto: "Zara Souza Farias",
      dataNascimento: "2021-07-24T03:00:00.000Z",
      rg: "78965412",
      cpf: "65498732199",
      telefone: "7133011581",
      celular: "71991895666",
      email: "zara@mail.com",
      senha: "livre",
      cep: "4000000",
      endereco: "rua vitor",
      numero: 6,
      complemento: "sem",
      bairro: "garcia",
    });
    expect(res.body).toEqual({
      id: 3,
      nome: "Zara",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
      nomeCompleto: "Zara Souza Farias",
      dataNascimento: "2021-07-24T03:00:00.000Z",
      rg: "78965412",
      cpf: "65498732199",
      telefone: "7133011581",
      celular: "71991895666",
      email: "zara@mail.com",
      senha: "livre",
      cep: "4000000",
      endereco: "rua vitor",
      numero: 6,
      complemento: "sem",
      bairro: "garcia",
    });

    expect(res.statusCode).toBe(200);
  });
  test("Alterar Usuário Inexistente", async () => {
    const res = await request.put("/usuarios/99").send({
      nome: "Zara",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
    });
    expect(res.statusCode).toBe(404);
  });
  test("Deletar Usuário", async () => {
    const res = await request.delete("/usuarios/3");
    expect(res.statusCode).toBe(204);
  });
  test("Deletar Usuário inexistente", async () => {
    const res = await request.delete("/usuarios/99");
    expect(res.statusCode).toBe(404);
  });

  test("Buscar usuário pelo nome", async () => {
    const res = await request.get("/usuarios/nome/Zara");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 3,
      nome: "Zara",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/71.jpg",
      nomeCompleto: "Zara Souza Farias",
      dataNascimento: "2021-07-24T03:00:00.000Z",
      rg: "78965412",
      cpf: "65498732199",
      telefone: "7133011581",
      celular: "71991895666",
      email: "zara@mail.com",
      senha: "livre",
      cep: "4000000",
      endereco: "rua vitor",
      numero: 6,
      complemento: "sem",
      bairro: "garcia",
    });
  });
  test("Buscar usuario por nome inexistente", async () => {
    const res = await request.get("/usuarios/nome/dagobar");
    expect(res.statusCode).toBe(404);
  });
  //Testes de dados pessoais

  describe("API de dados Pessoais", () => {
    test("Buscar dados pessoais de usuário (id)", async () => {
      const res = await request.get("/usuarios/3/dados-pessoais");
      expect(res.body).toEqual({
        id: 3,
        nomeCompleto: "Zara Souza Farias",
        dataNascimento: "2021-07-24T03:00:00.000Z",
        rg: "78965412",
        cpf: "65498732199",
      });
      expect(res.statusCode).toBe(200);
    });

    test("Buscar Dados Pessoais por Id Inexistente", async () => {
      const res = await request.get("/usuarios/2022/dados-pessoais");
      expect(res.statusCode).toBe(404);
    });

    test("Atualizar dados pessoais", async () => {
      const res = await request.put("/usuarios/3").send({
        id: 3,
        nomeCompleto: "Zara Souza Farias",
        dataNascimento: "2021-07-24T03:00:00.000Z",
        rg: "78965412",
        cpf: "65498732199",
      });
      expect(res.body).toEqual({
        id: 3,
        nomeCompleto: "Zara Souza Farias",
        dataNascimento: "2021-07-24T03:00:00.000Z",
        rg: "78965412",
        cpf: "65498732199",
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("API de Contatos", () => {
    test("Buscar contato por id", async () => {
      const res = await request.get("/usuarios/2/contatos");
      expect(res.body).toEqual({
        id: 2,
        telefone: "7133017310",
        celular: "71991895189",
        email: "bela@email.com",
      });
      expect(res.statusCode).toBe(200);
    });
    test("Atualizar contatos por id", async () => {
      const res = await request.put("/usuarios/3/contatos");
      expect(res.body).toEqual({
        id: 3,
        telefone: "7133011581",
        celular: "71991895666",
        email: "zara@mail.com",
      });
      expect(res.body).toEqual({
        id: 3,
        telefone: "7133011581",
        celular: "71991895666",
        email: "zara@mail.com",
      });
      expect(res.statusCode).toBe(200);
    });
  });
  describe("Api de endereços", () => {
    test("Inclusão de endereço", async () => {
      const res = await request.get("/usuarios/1/endereco");
      expect(res.body).toEqual({
        id: 1,
        cep: "40000000",
        endereco: "rua vitor",
        numero: 6,
        complemento: "sem",
        bairro: "garcia",
      });
      expect(res.statusCode).toBe(200);
    });
  });
  test("Atualização de endereço", async () => {
    const res = await request.put("/usuarios/2/endereco").send({
      id: 2,
      cep: "40000000",
      endereco: "rua vitor",
      numero: 6,
      complemento: "sem",
      bairro: "garcia",
    });
    expect(res.body).toEqual({
      id: 2,
      cep: "40000000",
      endereco: "rua vitor",
      numero: 6,
      complemento: "sem",
      bairro: "garcia",
    });
    expect(res.statusCode).toBe(200);
  });
  test("Buscar por endereço inexistente", async () => {
    const res = await request.get("/usuarios/99/dados-pessoais");
    expect(res.statusCode).toBe(404);
  });
});
