LOAD DATA LOCAL INFILE '/home/maume/ProjetosPessoais/01_Nulab_Ssa/Semana_20_Projeto/las-api/data/ufs_1.csv' INTO TABLE UFs FIELDS TERMINATED BY ',' (id, sigla, nome);

LOAD DATA LOCAL INFILE '/home/maume/ProjetosPessoais/01_Nulab_Ssa/Semana_20_Projeto/las-api/data/municipios.csv' INTO TABLE Municipios FIELDS TERMINATED BY ',' (id, nome, uf_id, uf_sigla, uf_nome, regiao_id, regiao_sigla, regiao_nome);
