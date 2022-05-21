// const supertest = require("supertest");
// const customExpress = require("../src/config/customExpress");

// const rotas = supertest(customExpress());

// jest.mock("../src/repositorios/usuarios");

// const retornoUsuarios = [
//   {
//     id: 2,
//     nome: "Caetano",
//     urlFotoPerfil: "https://randomuser.me/api/portraits/men/68.jpg",
//   },
//   {
//     id: 3,
//     nome: "Gilberto Gil",
//     urlFotoPerfil: "https://randomuser.me/api/portraits/men/78.jpg",
//   },
//   {
//     id: 4,
//     nome: "Veveta",
//     urlFotoPerfil: "https://randomuser.me/api/portraits/women/68.jpg",
//   },
// ];

// describe("Testa API GET", () => {
//   test("API de Usuarios", async () => {
//     const response = await rotas.get("/usuarios");

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(retornoUsuarios);
//   });

//   // Buscas por ID

//   test("Retorna Usuarios por ID existente", async () => {
//     const id = 2;
//     const retorno = retornoUsuarios.filter((usuario) => usuario.id === id);

//     const response = await rotas.get(`/usuarios/${id}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(retorno[0]);
//   });

//   test("Retorna Usuarios por ID inexistente", async () => {
//     const id = "teste";
//     const retorno = "Usuário não encontrado";

//     const response = await rotas.get(`/usuarios/${id}`);
//     expect(response.statusCode).toBe(404);
//     expect(response.body).toEqual(retorno);
//   });

//   // FIM Buscas por ID

//   // Buscas por nome

//   test("Retorna Usuarios por nome existente", async () => {
//     const nome = "Caetano";
//     const retorno = retornoUsuarios.filter((usuario) => usuario.nome === nome);

//     const response = await rotas.get(`/usuarios/nome/${nome}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(retorno[0]);
//   });

//   test("Retorna Usuarios por nome inexistente", async () => {
//     const nome = "KKKKKKK";

//     const response = await rotas.get(`/usuarios/nome/${nome}`);

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({ descrição: "Usuário não encontrado" });
//   });

//   // FIM Buscas por nome
// });

// describe("Testa API POST", () => {
//   test("Adicionar usuário com dados válidos", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Luís Caldas",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toEqual({
//       id: 5,
//       nome: "Luís Caldas",
//       url: "https://randomuser.me/api/portraits/men/44.jpg",
//     });
//   });

//   test("Rejeita usuário com nome inválido", async () => {
//     const response = await rotas.post("/usuarios").send({
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "Usuário deve ser informado e ser único",
//           nome: "existeUsuario",
//           resultado: true,
//         },
//       ],
//     });
//   });

//   test("Rejeita usuário com nome existente", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Veveta",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "Usuário deve ser informado e ser único",
//           nome: "existeUsuario",
//           resultado: true,
//         },
//       ],
//     });
//   });

//   test("Adicionar usuário com url inválida", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Bel Marques",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/67jpg",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "URL inválida!",
//           nome: "url",
//           resultado: true,
//         },
//       ],
//     });
//   });

//   test("Adicionar usuário com url inexistente", async () => {
//     const response = await rotas.post("/usuarios").send({
//       nome: "Bel Marques",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual({
//       descrição: "Entrada inválida",
//       erro: [
//         {
//           mensagem: "URL inválida!",
//           nome: "url",
//           resultado: true,
//         },
//       ],
//     });
//   });
// });

// describe("Testa API PUT", () => {
//   test("Atualiza usuário com dados válidos", async () => {
//     const response = await rotas.put("/usuarios/2").send({
//       nome: "Luís Caldas",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({
//       status: "Usuário atualizado com sucesso",
//     });
//   });

//   test("Atualiza usuário já cadastrado", async () => {
//     const response = await rotas.put("/usuarios/2").send({
//       nome: "Veveta",
//       urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
//     });

//     expect(response.statusCode).toBe(405);
//     expect(response.body).toEqual({
//       erro: [
//         {
//           nome: "existeUsuarioPUT",
//           mensagem: "Usuario já existe na base de dados",
//           resultado: true,
//         },
//       ],
//       status: "Entrada inválida",
//     });
//   });
// });

// describe("Testa API DELETE", () => {
//   test("Apaga usuário na base de dados", async () => {
//     const response = await rotas.delete("/usuarios/2");

//     expect(response.statusCode).toBe(204);
//   });

//   test("Apaga usuário inexistente na base de dados", async () => {
//     const response = await rotas.delete("/usuarios/1");

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toEqual("Usuário não encontrado");
//   });

//   test("Apaga usuário com ID inexistente", async () => {
//     const response = await rotas.delete("/usuarios/efef");

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toEqual("Id inválido fornecido");
//   });
// });
