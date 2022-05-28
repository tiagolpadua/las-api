const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());
jest.mock("../src/repositorios/usuario");

describe("API de Usuarios", () => {
  
  //ok
  test("Listar Usuarios",async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
          "id": 1,
          "nomeCompleto": "Alexandre",
          "rg": "1357174780",
          "cpf": "07828625510",
          "dataNascimento": "05101999",
          "telefone": "7132121422",
          "celular": "71999663589",
          "email": "etsvaldo@gmail.com",
          "urlFotoPerfil": "./assets/salsicha.jpg",
          "senha": "admin",
          "cep": "43700000",
          "endereco": "rua dois de julho",
          "numero": 256,
          "complemento": "",
          "bairro": "cia 3"
      },
      {
          "id": 2,
          "nomeCompleto": "Maiure",
          "rg": "1357174500",
          "cpf": "07828625510",
          "dataNascimento": "05101999",
          "telefone": "7132121422",
          "celular": "71999663589",
          "email": "etsvaldo",
          "urlFotoPerfil": "./assets/salsicha.jpg",
          "senha": "123",
          "cep": "43700000",
          "endereco": "rua dois de julho",
          "numero": 256,
          "complemento": "",
          "bairro": "cia 1"
      },
      {
          "id": 3,
          "nomeCompleto": "Zelda",
          "rg": "1357174500",
          "cpf": "07828625510",
          "dataNascimento": "05101999",
          "telefone": "7132121422",
          "celular": "71999663589",
          "email": "etsvaldo",
          "urlFotoPerfil": "./assets/salsicha.jpg",
          "senha": "123",
          "cep": "43700000",
          "endereco": "rua dois de julho",
          "numero": 256,
          "complemento": "",
          "bairro": "cia 1"
      }
  ]);
  });

  //ok
  test("Buscar Usuario pelo ID existente",async () => {
    const resp = await request.get("/usuarios/1");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
          "id": 1,
          "nomeCompleto": "Alexandre",
          "rg": "1357174780",
          "cpf": "07828625510",
          "dataNascimento": "05101999",
          "telefone": "7132121422",
          "celular": "71999663589",
          "email": "etsvaldo@gmail.com",
          "urlFotoPerfil": "./assets/salsicha.jpg",
          "senha": "admin",
          "cep": "43700000",
          "endereco": "rua dois de julho",
          "numero": 256,
          "complemento": "",
          "bairro": "cia 3"
      }
    );
  });

  //ok
  test("Buscar Usuario pelo ID inexistente",async () => {
    const resp = await request.get("/usuarios/50");
    expect(resp.statusCode).toBe(404);
  });
  
  //ok
  test("Adicionar Usuario com dados Validos",async () => {
    const resp = await request.post("/usuarios").send(
      {
      "nomeCompleto": "JOAO",
      "rg": "1357174500",
      "cpf": "07828625510",
      "dataNascimento": "05101999",
      "telefone": "7132121422",
      "celular": "71999663589",
      "email": "etsvaldo",
      "urlFotoPerfil": "https://randomuser.me/api/portraits/women/55.jpg",
      "senha": "123",
      "cep": "43700000",
      "endereco": "rua dois de julho",
      "numero": 256,
      "complemento": "",
      "bairro": "cia 1"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
      "id":90,
      "nomeCompleto": "JOAO",
      "rg": "1357174500",
      "cpf": "07828625510",
      "dataNascimento": "05101999",
      "telefone": "7132121422",
      "celular": "71999663589",
      "email": "etsvaldo",
      "urlFotoPerfil": "https://randomuser.me/api/portraits/women/55.jpg",
      "senha": "123",
      "cep": "43700000",
      "endereco": "rua dois de julho",
      "numero": 256,
      "complemento": "",
      "bairro": "cia 1"
    });
  });

  test("Alterar Usuario",async () => {
    const resp = await request.put("/usuarios/2").send({
        "nomeCompleto": "Maiure Brito",
        "rg": "1357174500",
        "cpf": "07828625510",
        "dataNascimento": "05101999",
        "telefone": "7132121422",
        "celular": "71999663589",
        "email": "etsvaldo",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/women/55.jpg",
        "senha": "123",
        "cep": "43700000",
        "endereco": "rua dois de julho",
        "numero": 256,
        "complemento": "",
        "bairro": "cia 1"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
        "id": 2,
        "nomeCompleto": "Maiure Brito",
        "rg": "1357174500",
        "cpf": "07828625510",
        "dataNascimento": "05101999",
        "telefone": "7132121422",
        "celular": "71999663589",
        "email": "etsvaldo",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/women/55.jpg",
        "senha": "123",
        "cep": "43700000",
        "endereco": "rua dois de julho",
        "numero": 256,
        "complemento": "",
        "bairro": "cia 1"
    });
  });

  test("Excluir Usuario",async () => {
    const resp = await request.delete("/usuarios/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 3
    });
  });

  //ok
  test("Buscar Usuario por Nome",async () => {
    const resp = await request.get("/usuarios/nome/Zelda");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
          "id": 3,
          "nomeCompleto": "Zelda",
          "rg": "1357174500",
          "cpf": "07828625510",
          "dataNascimento": "05101999",
          "telefone": "7132121422",
          "celular": "71999663589",
          "email": "etsvaldo",
          "urlFotoPerfil": "./assets/salsicha.jpg",
          "senha": "123",
          "cep": "43700000",
          "endereco": "rua dois de julho",
          "numero": 256,
          "complemento": "",
          "bairro": "cia 1"
      }
  );
  });

  test("Listar Dados pessoais do Usuario",async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id":1,
        "nomeCompleto": "Alexandre",
        "rg": "1357174780",
        "cpf": "07828625510",
        "dataNascimento": "05101999",
      }
  );
  });

  test("Alterar Dados pessoais do Usuario",async () => {
    const resp = await request.put("/usuarios/2/dados-pessoais").send({
      "nomeCompleto": "Maiure Brito15",
      "rg": "1357174500",
      "cpf": "07828625510",
      "dataNascimento": "05101999"}
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 2,
      "nomeCompleto": "Maiure Brito15",
      "rg": "1357174500",
      "cpf": "07828625510",
      "dataNascimento": "05101999"
  });
  });

  test("Listar Contatos do Usuario",async () => {
    const resp = await request.get("/usuarios/1/contatos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id":1,
        "telefone": "7132121422",
        "celular": "71999663589",
        "email": "etsvaldo@gmail.com"
      }
  );
  });

  test("Alterar Contatos do Usuario",async () => {
    const resp = await request.put("/usuarios/2/contatos").send({
      "telefone": "7132121422",
      "celular": "71999663589",
      "email": "etsvaldo@gmail.com"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id":2,
        "telefone": "7132121422",
        "celular": "71999663589",
        "email": "etsvaldo@gmail.com"
      }
  );
  });

  test("Alterar Senha do Usuario",async () => {
    const resp = await request.put("/usuarios/2/senha").send({
    "senha": "321"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id": 2,
      "senha": "321"
    });
  });

  test("Listar Endereco do Usuario",async () => {
    const resp = await request.get("/usuarios/1/endereco");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        "id":1,
        "cep": "43700000",
        "endereco": "rua dois de julho",
        "numero": 256,
        "complemento": "",
        "bairro": "cia 3"
      }
  );
  });

  test("Alterar Endereco do Usuario",async () => {
    const resp = await request.put("/usuarios/2/endereco").send({
      "cep": "43700000",
      "endereco": "rua dois de julho",
      "numero": 256,
      "complemento": "",
      "bairro": "cia 30"
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "id":2,
      "cep": "43700000",
      "endereco": "rua dois de julho",
      "numero": 256,
      "complemento": "",
      "bairro": "cia 30"
    });
  });
});