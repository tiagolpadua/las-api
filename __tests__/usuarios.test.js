const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const rotas = supertest(customExpress());

jest.mock("../src/repositorios/usuarios");

const retornoUsuarios = [
  {
    id: 2,
    nome: "Caetano",
    urlFotoPerfil: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: 3,
    nome: "Gilberto Gil",
    urlFotoPerfil: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    id: 4,
    nome: "Veveta",
    urlFotoPerfil: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

describe("Testa API GET", () => {
  test("API de Usuarios", async () => {
    const response = await rotas.get("/usuarios");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retornoUsuarios);
  });

  // Buscas por ID

  test("Retorna Usuarios por ID existente", async () => {
    const id = 2;
    const retorno = retornoUsuarios.filter((usuario) => usuario.id === id);

    const response = await rotas.get(`/usuarios/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retorno[0]);
  });

  test("Retorna Usuarios por ID inexistente", async () => {
    const id = "teste";
    const retorno = "Usuário não encontrado";

    const response = await rotas.get(`/usuarios/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(retorno);
  });

  // FIM Buscas por ID

  // Buscas por nome

  test("Retorna Usuarios por nome existente", async () => {
    const nome = "Caetano";
    const retorno = retornoUsuarios.filter((usuario) => usuario.nome === nome);

    const response = await rotas.get(`/usuarios/nome/${nome}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retorno[0]);
  });

  test("Retorna Usuarios por nome inexistente", async () => {
    const nome = "KKKKKKK";

    const response = await rotas.get(`/usuarios/nome/${nome}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ descrição: "Usuário não encontrado" });
  });

  // FIM Buscas por nome
});

describe("Testa API POST", () => {
  test("Adicionar usuário com dados válidos", async () => {
    const response = await rotas.post("/usuarios").send({
      nome: "Luís Caldas",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 5,
      nome: "Luís Caldas",
      url: "https://randomuser.me/api/portraits/men/44.jpg",
    });
  });

  test("Rejeita usuário com nome inválido", async () => {
    const response = await rotas.post("/usuarios").send({
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      descrição: "Entrada inválida",
      erro: [
        {
          mensagem: "Usuário deve ser informado e ser único",
          nome: "existeUsuario",
          resultado: true,
        },
      ],
    });
  });

  test("Rejeita usuário com nome existente", async () => {
    const response = await rotas.post("/usuarios").send({
      nome: "Veveta",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      descrição: "Entrada inválida",
      erro: [
        {
          mensagem: "Usuário deve ser informado e ser único",
          nome: "existeUsuario",
          resultado: true,
        },
      ],
    });
  });

  test("Adicionar usuário com url inválida", async () => {
    const response = await rotas.post("/usuarios").send({
      nome: "Bel Marques",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/67jpg",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      descrição: "Entrada inválida",
      erro: [
        {
          mensagem: "URL inválida!",
          nome: "url",
          resultado: true,
        },
      ],
    });
  });

  test("Adicionar usuário com url inexistente", async () => {
    const response = await rotas.post("/usuarios").send({
      nome: "Bel Marques",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      descrição: "Entrada inválida",
      erro: [
        {
          mensagem: "URL inválida!",
          nome: "url",
          resultado: true,
        },
      ],
    });
  });
});

describe("Testa API PUT", () => {
  test("Atualiza usuário com dados válidos", async () => {
    const response = await rotas.put("/usuarios/2").send({
      nome: "Luís Caldas",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "Usuário atualizado com sucesso",
    });
  });

  test("Atualiza usuário já cadastrado", async () => {
    const response = await rotas.put("/usuarios/2").send({
      nome: "Veveta",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({
      erro: [
        {
          nome: "existeUsuarioPUT",
          mensagem: "Usuario já existe na base de dados",
          resultado: true,
        },
      ],
      status: "Entrada inválida",
    });
  });
});

describe("Testa API DELETE", () => {
  test("Apaga usuário na base de dados", async () => {
    const response = await rotas.delete("/usuarios/2");

    expect(response.statusCode).toBe(204);
  });

  test("Apaga usuário inexistente na base de dados", async () => {
    const response = await rotas.delete("/usuarios/1");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Usuário não encontrado");
  });

  test("Apaga usuário com ID inexistente", async () => {
    const response = await rotas.delete("/usuarios/efef");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Id inválido fornecido");
  });
});

const retornoDadosPessoais = [
  {
    id: 3,
    nomeCompleto: "Gilberto Passos Gil Moreira",
    dataNascimento: "1942-06-26T03:00:00.000Z",
    rg: "4563456784",
    cpf: "25634428777",
    // descrição: "Operação bem sucedida",
  },
  {
    id: 4,
    nomeCompleto: "Ivete Sangalo",
    dataNascimento: "1972-05-27T03:00:00.000Z",
    rg: "4563456784",
    cpf: "25634428777",
    // descrição: "Operação bem sucedida",
  },
  {
    id: 5,
    nomeCompleto: "Caetano Veloso",
    dataNascimento: "1942-08-07T03:00:00.000Z",
    rg: "4563456784",
    cpf: "25634428777",
    // descrição: "Operação bem sucedida",
  },
];

describe("Testa API DADOSPESSOAIS GET", () => {
  test("API Dados-Pessoais por ID", async () => {
    const response = await rotas.get("/usuarios/3/dados-pessoais");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(retornoDadosPessoais[0]);
  });

  test("API Dados-Pessoais por ID inexistente", async () => {
    const response = await rotas.get("/usuarios/999/dados-pessoais");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Usuário não encontrado");
  });

  test("API Dados-Pessoais por ID inexistente", async () => {
    const response = await rotas.get("/usuarios/kkkkk/dados-pessoais");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Id inválido fornecido");
  });
});

describe("Testa API DADOSPESSOAIS PUT", () => {
  test("Atualiza Dados-Pessoais por ID", async () => {
    const response = await rotas.put("/usuarios/4/dados-pessoais").send({
      nomeCompleto: "Ivete Sangalo",
      dataNascimento: "01-05-2000",
      rg: "7866564576",
      cpf: "25634428777",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("Usuário atualizado com sucesso");
  });

  test("Atualiza Dados-Pessoais dados inválidos", async () => {
    const response = await rotas.put("/usuarios/4/dados-pessoais").send({
      nomeCompleto: "Ivete Sangalo",
      dataNascimento: "01-05-2000",
      rg: "7866564576",
      cpf: "85634428777",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({
      erro: [
        {
          nome: "validaCPF",
          mensagem: "CPF inválido",
          resultado: true,
        },
      ],
      status: "Entrada inválida",
    });
  });

  test("Atualiza Dados-Pessoais nome inválido", async () => {
    const response = await rotas.put("/usuarios/4/dados-pessoais").send({
      nomeCompleto: "Iv",
      dataNascimento: "01-05-2000",
      rg: "7866564576",
      cpf: "25634428777",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({
      erro: [
        {
          nome: "nomeCompleto",
          mensagem: "nomeCompleto deve ter pelo menos cinco caracteres",
          resultado: true,
        },
      ],
      status: "Entrada inválida",
    });
  });
});

describe("Testa API CONTATOS GET", () => {
  test("API Contatos por ID", async () => {
    const response = await rotas.get("/usuarios/5/contatos");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      celular: "43675336789",
      descrição: "Operação bem sucedida",
      email: "caetano.veloso@gmail.com",
      id: 5,
      telefone: "4567895678",
    });
  });

  test("API Contatos com ID inválido", async () => {
    const response = await rotas.get("/usuarios/5666/contatos");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Contato não encontrado");
  });

  test("API Contatos com ID inválido", async () => {
    const response = await rotas.get("/usuarios/dfgdfg/contatos");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Id inválido fornecido");
  });
});

describe("Testa API CONTATOS PUT", () => {
  test("Atualiza Contato por ID", async () => {
    const response = await rotas.put("/usuarios/5/contatos").send({
      telefone: "6233311212",
      celular: "62998757575",
      email: "foobar@gmail.com",
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  test("Atualiza Contato ID inválido", async () => {
    const response = await rotas.put("/usuarios/5555/contatos").send({
      telefone: "6233311212",
      celular: "62998757575",
      email: "foobar@gmail.com",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Contato não encontrado");
  });

  test("Atualiza Contato ID inválido", async () => {
    const response = await rotas.put("/usuarios/kkkk/contatos").send({
      telefone: "6233311212",
      celular: "62998757575",
      email: "foobar@gmail.com",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({
      status: "Entrada inválida",
    });
  });
});

describe("Testa API SENHA PUT", () => {
  test("Atualiza senha por ID", async () => {
    const response = await rotas.put("/usuarios/2/senha").send({
      senha: "admin",
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  test("Atualiza senha por ID inexistente", async () => {
    const response = await rotas.put("/usuarios/22222/senha").send({
      senha: "admin",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Contato não encontrado");
  });

  test("Atualiza senha por ID inexistente", async () => {
    const response = await rotas.put("/usuarios/kkkkk/senha").send({
      senha: "admin",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({ status: "Entrada inválida" });
  });
});

describe("Testa API ENDERECO GET", () => {
  test("API ENDEREÇO por ID", async () => {
    const response = await rotas.get("/usuarios/5/endereco");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      bairro: "Leblon - Rio de Janeiro, RJ",
      cep: "45655434",
      complemento: "AP 402",
      endereco: "R General Venâncio Flores",
      id: 5,
      numero: 475,
    });
  });

  test("Busca ENDEREÇO por ID inexistente", async () => {
    const response = await rotas.get("/usuarios/54545/endereco");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Endereco não encontrado");
  });

  test("Busca ENDEREÇO por ID inválido", async () => {
    const response = await rotas.get("/usuarios/huahuahau/endereco");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ status: "Id inválido fornecido" });
  });
});

describe("Testa API ENDERECO PUT", () => {
  test("Atualiza ENDERECO por ID", async () => {
    const response = await rotas.put("/usuarios/5/endereco").send({
      cep: "72980000",
      endereco: "Rua 123",
      numero: 23,
      complemento: "Apartamento 509",
      bairro: "Zona Norte",
    });

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  test("Atualiza ENDERECO por ID inválido", async () => {
    const response = await rotas.put("/usuarios/54545/endereco").send({
      cep: "72980000",
      endereco: "Rua 123",
      numero: 23,
      complemento: "Apartamento 509",
      bairro: "Zona Norte",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual("Endereço não encontrado");
  });

  test("Atualiza ENDERECO por ID inválido", async () => {
    const response = await rotas.put("/usuarios/kkkkkk/endereco").send({
      cep: "72980000",
      endereco: "Rua 123",
      numero: 23,
      complemento: "Apartamento 509",
      bairro: "Zona Norte",
    });

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({ status: "Entrada inválida" });
  });
});
