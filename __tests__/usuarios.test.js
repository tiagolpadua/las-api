const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorio/usuario");
describe("API de Usuários", () => {
  test("Listar Usuários", async () => {
    const resp = await request.get("/usuarios");
    const listaUsuarios = [
      {
        id: 1,
        nome: "Tainah Carvalho",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/83484176?v=4",
      },
      {
        id: 2,
        nome: "Mauricio Menezes",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/20570844?v=4",
      },
      {
        id: 3,
        nome: "Aleatório da Silva",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
      },
    ];

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(listaUsuarios);
  });
  test("Buscar Usuários por Id Existente", async () => {
    const resp = await request.get("/usuarios/3");
    const usuario = {
      id: 3,
      nome: "Aleatório da Silva",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    };

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuario);
  });
  test("Buscar Usuários por Id Inexistente", async () => {
    const resp01 = await request.get("/usuarios/999");
    const resp02 = await request.get("/usuarios/xx");

    expect(resp01.statusCode).toBe(404);
    expect(resp02.statusCode).toBe(500);
  });
  test("Inserir um Usuário com os Dados Válidos", async () => {
    const usuario = {
      nome: "Vulgo de Oliveira",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/36.jpg",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ id: 99, ...usuario });
  });
  test("Inserir um Usuário com Nome Existente", async () => {
    const usuario = {
      nome: "Aleatório da Silva",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/36.jpg",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });
  test("Inserir um Usuário com o Nome Inválido", async () => {
    const usuario = {
      nome: "",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/36.jpg",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]);
  });

  test("Inserir um Usuário com a URL Inválido", async () => {
    const usuario = {
      nome: "Vulgo de Castro",
      urlFotoPerfil: "https://urlInvalida.com.br",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  test("Inserir um Usuário com Nome e URL Inválidos", async () => {
    const usuario = {
      nome: "",
      urlFotoPerfil: "xxxxxxxxxxxxxxxxx",
    };
    const resp = await request.post("/usuarios").send(usuario);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual([
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      },
    ]);
  });

  test("Deletar Usuários com ID Existente", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(204);
  });

  test("Deletar Usuários com ID Inexistente", async () => {
    const resp = await request.delete("/usuarios/99");
    expect(resp.statusCode).toBe(404);
  });

  test("Atualizar um Usuário com Id Existente com os Dados Válidos", async () => {
    const usuario = {
      nome: "Aleatório",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    };
    const resp = await request.put("/usuarios/3").send(usuario);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ id: 3, ...usuario });
  });

  test("Atualizar um Usuário com Id inexistente", async () => {
    const usuario = {
      nome: "Aleatório",
      urlFotoPerfil: "https://randomuser.me/api/portraits/men/16.jpg",
    };
    const resp01 = await request.put("/usuarios/999").send(usuario);
    const resp02 = await request.put("/usuarios/xx").send(usuario);

    expect(resp01.statusCode).toBe(404);
    expect(resp02.statusCode).toBe(500);
  });

  test("Buscar Usuários por Nome Existente", async () => {
    const resp = await request.get("/usuarios/nome/Mauricio");
    const usuario = [
      {
        id: 2,
        nome: "Mauricio Menezes",
        urlFotoPerfil: "https://avatars.githubusercontent.com/u/20570844?v=4",
      },
    ];

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(usuario);
  });

  test("Buscar Usuários por Nome Inexistente", async () => {
    const resp = await request.get("/usuarios/nome/pedro");

    expect(resp.statusCode).toBe(404);
  });
});

describe("API de Dados Pessoais", () => {
  test("Buscar Dados Pessoais do Usuários com Id Existente", async () => {
    const resp = await request.get("/usuarios/2/dados-pessoais");
    const dadosPessoaisUsuario = {
      nomeCompleto: "Mauricio Souza Menezes",
      dataNascimento: "1995-07-30",
      rg: "9999999999",
      cpf: "99999999999",
    };

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(dadosPessoaisUsuario);
  });

  test("Buscar Dados Pessoais do Usuários com Id Inexistente", async () => {
    const resp = await request.get("/usuarios/99/dados-pessoais");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });

  test("Atualizar Dados Pessoais de um Usuário", async () => {
    const dadosPessoaisUsuario = {
      nomeCompleto: "Mauricio Menezes",
      dataNascimento: "1995-07-30",
      rg: "9999999999",
      cpf: "03402143410",
    };
    const dadosPessoaisCpfInvalido = {
      nomeCompleto: "Mauricio Menezes",
      dataNascimento: "1995-07-30",
      rg: "9999999999",
      cpf: "99999999999",
    };
    const resp01 = await request
      .put("/usuarios/2/dados-pessoais")
      .send(dadosPessoaisUsuario);
    const resp02 = await request
      .put("/usuarios/99/dados-pessoais")
      .send(dadosPessoaisUsuario);
    const resp03 = await request
      .put("/usuarios/2/dados-pessoais")
      .send(dadosPessoaisCpfInvalido);

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(dadosPessoaisUsuario);

    expect(resp02.statusCode).toBe(404);

    expect(resp03.statusCode).toBe(404);
    expect(resp03.body).toEqual({
      mensagem: "CPF informado deve ser válido",
      nome: "cpf",
      valido: false,
    });
  });
});

describe("API de Contatos", () => {
  test("Buscar Contatos do Usuários com Id Existente", async () => {
    const resp01 = await request.get("/usuarios/1/contatos");
    const contatosUsuario = {
      telefone: "99999999",
      celular: "999999999",
      email: "m@m.com.br",
    };

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(contatosUsuario);
  });

  test("Buscar Contatos do Usuários com Id Inexistente", async () => {
    const resp = await request.get("/usuarios/99/contatos");

    expect(resp.statusCode).toBe(404);
  });

  test("Atualizar Contatos de um Usuário com Id Existente", async () => {
    const contatosUsuario = {
      telefone: "99999999",
      celular: "999999999",
      email: "m@m.com",
    };
    const resp01 = await request
      .put("/usuarios/2/contatos")
      .send(contatosUsuario);

    const resp02 = await request
      .put("/usuarios/99/contatos")
      .send(contatosUsuario);
    const resp03 = await request
      .put("/usuarios/xx/contatos")
      .send(contatosUsuario);

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(contatosUsuario);
    expect(resp02.statusCode).toBe(404);
    expect(resp03.statusCode).toBe(500);
  });
});

describe("API de Senhas", () => {
  test("Atualizar Senha de um Usuário", async () => {
    const senhaUsuario = {
      senha: "admin",
    };
    const resp01 = await request.put("/usuarios/1/senha").send(senhaUsuario);
    const resp02 = await request.put("/usuarios/xx/senha").send(senhaUsuario);

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(senhaUsuario);
    expect(resp02.statusCode).toBe(500);
  });
});

describe("API de Endereços", () => {
  test("Buscar Endereço do Usuários com Id Existente", async () => {
    const resp = await request.get("/usuarios/1/endereco");
    const enderecoUsuario = {
      cep: "99999999",
      endereco: "rua r",
      numero: 9,
      bairro: "b",
      complemento: "nenhum",
    };

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(enderecoUsuario);
  });

  test("Buscar Endereço do Usuários com Id Inexistente", async () => {
    const resp = await request.get("/usuarios/99/endereco");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([]);
  });

  test("Atualizar Endereço de um Usuário", async () => {
    const contatosUsuario = {
      telefone: "99999999",
      celular: "999999999",
      email: "m@m.com",
    };
    const resp01 = await request
      .put("/usuarios/2/endereco")
      .send(contatosUsuario);
    const resp02 = await request.put("/usuarios/xx/endereco");

    expect(resp01.statusCode).toBe(200);
    expect(resp01.body).toEqual(contatosUsuario);
    expect(resp02.statusCode).toBe(500);
  });
});
