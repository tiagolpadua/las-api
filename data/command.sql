--https://mariadb.com/kb/en/load-data-infile/
--https://servicosdados.ibge.gov.br/api/docs/localidades#api-UFs-estadosGet

LOAD DATA LOCAL INFILE './data/ufs.csv' INTO TABLE ufs fields terminated by ',' (id, sigla, nome)