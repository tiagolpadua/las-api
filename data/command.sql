LOAD DATA LOCAL INFILE 'data/ufs.csv' INTO TABLE UFs CHARACTER SET utf8mb4 fields terminated by ',' LINES (id,sigla) IGNORE;

load data local infile 'data/ufs.csv' into table UFs fields terminated by ',' lines (id,sigla);

-- Povoa o banco de dados com os UFs e Municipios

-- const axios = require("axios").default;
-- const mysql = require("mysql");

-- // cria uma conexão no mysql
-- const connection = mysql.createConnection({
--   host: "127.0.0.1",
--   port: 3306,
--   user: "las",
--   password: "admin",
--   database: "las",
-- });

-- // cria um objeto do axios com url base (para não precisar)
-- // ficar digitando o tempo todo o caminho inteiro
-- const baseURL = "https://servicodados.ibge.gov.br/api/v1/localidades";
-- const ibgeApi = axios.create({
--   baseURL,
-- });

-- // obtém os estados do brasil na api
-- function obterEstados() {
--   return ibgeApi.get("/estados");
-- }

-- // insere os estados no banco
-- function inserirEstado(UFs) {
--   const sql = "INSERT INTO UFs SET ?";
--   return connection.query(sql, UFs);
-- }

-- // obtém os municipios do estado e adiciona a sigla do estado
-- // no objeto que é retornado
-- function obterMunicipios(id, sigla) {
--   const path = `/estados/${id}/municipios`;
--   return ibgeApi.get(path).then((resultado) => {
--     const { data } = resultado;
--     const municipios = [];
--     for (let i = 0; i < data.length; i++) {
--       const municipio = data[i];
--       municipios.push({ sigla, id: municipio.id, nome: municipio.nome });
--     }
--     return municipios;
--   });
-- }

-- // insere os municipios no banco (bulk insert)
-- function inserirMunicipios(municipios) {
--   const sql = "INSERT INTO Municipios (id, siglaEstado, nome) VALUES ?";
--   return connection.query(sql, [
--     /** aqui ele extrai o id, sigla-estado e nome do municipio
--      * 
--      * ex: 
--      * entrada: [
--      *            { sigla: "BA", id: 1, nome: "Salvador" }, 
--      *            { sigla: "BA", id: 2, nome: "Pojuca" }
--      *          ]
--      * 
--      * saída: [[1, "BA", "Salvador"], [2, "BA", "Pojuca"]] 
--      *
--      * isso é feito para que possamos inserir no banco 
--      * todos os registros de uma só vez
--      *  */
--     municipios.map(item => [item.id, item.sigla, item.nome])
--   ]);
-- }


-- async function main() {
--   const resultado = [];
--   console.log("Iniciando request");
--   const estados = (await obterEstados()).data;
--   console.log("Estados retornados: ", estados.length);
--   for (let i = 0; i < estados.length; i++) {
--     //utiliza o for para inserir o estado
--     //benefício: mais simples de implementar
--     //malefício: em caso de muitos registros, essa abordagem vai ser EXTREMAMENTE LENTA
--     const { id, sigla } = estados[i];
--     resultado.push(await inserirEstado({ id, sigla }));

--     //utiliza bulk insert para o municipio
--     //benefício: extremamente mais rápido de inserir no banco
--     //malefício: a primeira vista parece um pouco mais complexo
--     const municipios = await obterMunicipios(id, sigla);
--     console.log(`Municipios retornados para ${sigla} :`, municipios.length);
--     // insere os municipios no banco
--     await inserirMunicipios(municipios);
--     console.log("Municipios inseridos com sucesso");
--   }
--   console.log("Registros inseridos: ", resultado.length);
-- }

-- main()
--   // eslint-disable-next-line no-unused-vars
--   .then(_ => {
--     console.log("Inserção concluída com sucesso... Verifique o seu banco de dados!");
--     process.exit();
--   });
