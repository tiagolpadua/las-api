const USUARIO = require("./usuarios");

const usuariosBanco = [
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
  {
    id: 5,
    nome: "Caetano",
    urlFotoPerfil: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: 48,
    nome: "teste",
    urlFotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 50,
    nome: "Luís Caldas",
    urlFotoPerfil: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const dadosPessoais = [
  {
    id: 3,
    nomeCompleto: "Gilberto Passos Gil Moreira",
    dataNascimento: "1942-06-26T03:00:00.000Z",
    rg: "4563456784",
    cpf: "25634428777",
  },
];

it("Testa query listarUsuarios", async () => {
  let usuarios = await USUARIO.listarUsuarios();

  usuarios = usuarios.map((artista) => ({ ...artista }));

  expect(usuarios).toEqual(usuariosBanco);
});

it("Testa query buscaUsuarioId", async () => {
  const id = 3;
  let usuarios = await USUARIO.buscaUsuarioId(id);
  const retorno = usuariosBanco.filter((item) => item.id === id);

  expect(usuarios).toEqual(retorno);
});

it("Testa query buscaUsuarioId id inválido", async () => {
  const id = 1;
  let usuarios = await USUARIO.buscaUsuarioId(id);
  const retorno = usuariosBanco.filter((item) => item.id === id);

  expect(usuarios).toEqual(retorno);
});

it("Testa query buscaUsuarioPeloNome", async () => {
  const nome = "Veveta";
  let usuarios = await USUARIO.buscaUsuarioPeloNome(nome);
  const retorno = usuariosBanco.filter((item) => item.nome === nome);

  expect(usuarios).toEqual(retorno);
});

it("Testa query buscaUsuarioPeloNome nome inválido", async () => {
  const nome = "Bel Marques";
  let usuarios = await USUARIO.buscaUsuarioPeloNome(nome);
  const retorno = usuariosBanco.filter((item) => item.nome === nome);

  expect(usuarios).toEqual(retorno);
});

it("Testa query buscaDadosPessoais por Id", async () => {
  const id = 3;
  let usuarios = await USUARIO.buscaDadosPessoaisId(id);
  const retorno = dadosPessoais
    .filter((item) => item.id === id)
    .map((item) => {
      delete item.id;
      return item;
    });

  expect(usuarios[0]).toEqual(retorno[0]);
});
