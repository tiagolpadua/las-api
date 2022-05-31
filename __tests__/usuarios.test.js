const supertest = require("supertest");
const customExpress = require("../src/config/customExpress");

const request = supertest(customExpress());

jest.mock("../src/repositorios/usuarios");

describe("API de Usuários", () => {
  test("Listar usuários", async () => {
    const resp = await request.get("/usuarios");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([
      {
        "id": 1,
        "nome": "Socorro",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/men/30.jpg"
      },
      {
        "id": 2,
        "nome": "Paolla",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/men/65.jpg"
      },
      {
        "id": 3,
        "nome": "Jonas",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/men/98.jpg"
      },
      {
        "id": 4,
        "nome": "Rodrigo",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/women/101.jpg"
      }  
    ]);
  });

  test("Buscar usuário por id existente", async () => {
    const resp = await request.get("/usuarios/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
        "id": 3,
        "nome": "Jonas",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/men/98.jpg"
      });
  });

  test("Buscar usuário por id inexistente", async () => {
    const resp = await request.get("/usuarios/999");
    expect(resp.statusCode).toBe(404);
   
  });

  test("Buscar usuário por nome existente", async () => {
    const respNomeInvalido = await request.get("/usuarios/nome/Paolla");
    expect(respNomeInvalido.statusCode).toBe(200);
    expect(respNomeInvalido.body).toEqual({
      "id": 2,
      "nome": "Paolla",
      "urlFotoPerfil": "https://randomuser.me/api/portraits/men/65.jpg"
    });
  });

  test("Buscar usuário por nome inexistente", async () => {
    const resp = await request.get("/usuarios/nome/mariera");
    expect(resp.statusCode).toBe(404);  
  });
 
  test("Adicionar Usuário com Dados Válidos", async () => {

    const resp = await request.post("/usuarios").send({
      nome: "Maitê",
      urlFotoPerfil:"https://randomuser.me/api/portraits/women/3.jpg"
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      id:99, 
      nome: "Maitê",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/3.jpg",
    });
  });
  
  test("Adicionar Usuário com Nome Inválido", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/3.jpg"
    });
    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({"erroApp": [
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]});
  });

  test("Adicionar Usuário com Nome que já possui", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "Rodrigo",
      urlFotoPerfil: "https://randomuser.me/api/portraits/women/3.jpg",
    });
    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({"erroApp": [
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
    ]});
  });

  test("Adicionar Usuário com Dados Inválidos", async () => {
    const resp = await request.post("/usuarios").send({
      nome: "",
      urlFotoPerfil:"xxxxxxxxxxxxxxxxxxxxxxxxxx"
    });
    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({"erroApp": [
      {
        mensagem: "Nome deve ser informado e deve ser único",
        nome: "nome",
        valido: false,
      },
      {
        mensagem: "URL deve uma URL válida",
        nome: "urlFotoPerfil",
        valido: false,
      }
    ]});
  });

  test("Atualizar usuário com id existente", async () => {
    const resp = await request.put("/usuarios/1").send(
      {
        nome: "Socorro",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/30.jpg"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        id: 1,
        nome: "Socorro",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/30.jpg"
      }
    );
  });

  test("Atualizar usuário com id inexistente", async () => {
    const resp = await request.put("/usuarios/999").send(
      {
        nome: "Jesuíta",
        urlFotoPerfil: "https://randomuser.me/api/portraits/men/3.jpg"
      }
    );
    expect(resp.statusCode).toBe(404);
  });
  
  test("Deletar usuário com id existente", async () => {
    const resp = await request.delete("/usuarios/1");
    expect(resp.statusCode).toBe(204);
  });

  test("Deletar usuário com id inexistente", async () => {
    const resp = await request.delete("/usuarios/999");
    expect(resp.statusCode).toBe(404);
  });



  // Dados Pessoais

  test("Listar Dados Pessoais com id existente", async () => {
    const resp = await request.get("/usuarios/1/dados-pessoais");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        cpf: "00000000003",
        dataNascimento: "30081980",
        nomeCompleto: "João Paulo Souza Santos",
        rg: "1212312312",
      }
    );
  });

  test("Listar Dados Pessoais com id inexistente", async () => {
    const resp = await request.get("/usuarios/999/dados-pessoais");
    expect(resp.statusCode).toBe(404);
  });


  test("Atualizar Dados Pessoais do Usuário com id existente", async () => {
    const resp = await request.put("/usuarios/1/dados-pessoais").send(
      {
        nomeCompleto: "Maria Pereira Souza Santos" ,
        dataNascimento: "10121978",
        rg: "1313312312" ,
        cpf: "11100000003"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        nomeCompleto: "Maria Pereira Souza Santos" ,
        dataNascimento: "10121978",
        rg: "1313312312" ,
        cpf: "11100000003"
      }
    );
  });

  // Contatos
  test("Listar Contatos com id existente", async () => {
    const resp = await request.get("/usuarios/1/contatos");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        celular: "(77) 99996-9098",
        email: "joao@gmail.com",
        telefone: "(77) 3526-9098"
      }
    );
  });

  test("Listar Contatos com id inexistente", async () => {
    const resp = await request.get("/usuarios/999/contatos");
    expect(resp.statusCode).toBe(404);
  });

  test("Atualizar Contato do Usuário com id existente", async () => {
    const resp = await request.put("/usuarios/3/contatos").send(
      {
        cep: "46887-875",
        endereco: "Av. Cardeal",
        numero: "1147",
        complemento: "Apartamento" ,
        bairro: "Rio Vermelho"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        bairro: "Rio Vermelho",
        cep: "46887-875",
        complemento: "Apartamento" ,
        endereco: "Av. Cardeal",
        numero: "1147",
      }
    );
  });

  // // Senha
  test("Atualizar Senha do Usuário com id existente", async () => {
    const resp = await request.put("/usuarios/1/senha").send(
      {
        senha: "senha123"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        senha: "senha123"
      }
    );
  });


  // // Endereço
  test("Listar Endereço com id existente", async () => {
    const resp = await request.get("/usuarios/3");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
        "id": 3,
        "nome": "Jonas",
        "urlFotoPerfil": "https://randomuser.me/api/portraits/men/98.jpg"
      });
  });

  test("Listar Endereço com id inexistente", async () => {
    const resp = await request.get("/usuarios/99/endereco");
    expect(resp.statusCode).toBe(404);
   
  });

  test("Atualizar Endereço do Usuário com id existente", async () => {
    const resp = await request.put("/usuarios/3/endereco").send(
      {
        cep: "46887-875",
        endereco: "Av. Cardeal",
        numero: "1147",
        complemento: "Apartamento" ,
        bairro: "Rio Vermelho"
      }
    );
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(
      {
        bairro: "Rio Vermelho",
        cep: "46887-875",
        complemento: "Apartamento" ,
        endereco: "Av. Cardeal",
        numero: "1147",
      }
    );
  });


 
});
