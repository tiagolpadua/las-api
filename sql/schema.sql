CREATE USER 'las'@'localhost' IDENTIFIED BY 'admin';

CREATE DATABASE las;

GRANT ALL PRIVILEGES ON * . * TO 'las'@'localhost';



-- insert into usuarios(id, nome, urlFotoPerfil)  values (1,"JoaoP", "https://randomuser.me/api/portraits/men/82.jpg");
-- insert into usuarios(id, nome, urlFotoPerfil)  values (2,"MariaP", "https://randomuser.me/api/portraits/men/19.jpg");     
-- insert into usuarios(id, nome, urlFotoPerfil)  values (3,"Maria", "https://randomuser.me/api/portraits/men/19.jpg");      
-- insert into usuarios(id, nome, urlFotoPerfil)  values (4,"Joaquina", "https://randomuser.me/api/portraits/women/16.jpg"); 
-- insert into usuarios(id, nome, urlFotoPerfil)  values (5,"Jorge", "https://randomuser.me/api/portraits/men/61.jpg");      
-- insert into usuarios(id, nome, urlFotoPerfil)  values (6,"Victor", "https://randomuser.me/api/portraits/men/77.jpg");     

CREATE TABLE IF NOT EXISTS Usuarios(
  id INT AUTO_INCREMENT NOT NULL,
  nome VARCHAR(100) NOT NULL, 
  urlFotoPerfil text, 


  -- Dados Pessoais
  nomeCompleto VARCHAR(100),
  dataNascimento VARCHAR(15),
  rg VARCHAR(14),
  cpf VARCHAR(13),

  -- Contatos
  telefone VARCHAR(14),
  celular VARCHAR(15),
  email VARCHAR(50),

  -- Senha
  senha VARCHAR(20),

  -- Endereço
  cep VARCHAR(10),
  endereco VARCHAR(50),
  numero INT,
  complemento VARCHAR(20),
  bairro VARCHAR(20),

  UNIQUE (nome), 
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Eventos(
  id INT AUTO_INCREMENT NOT NULL,
  nome VARCHAR(50) NOT NULL, 
  descricao VARCHAR(100) NOT NULL, 
  urlFoto text NOT NULL, 
  dataInicio date NOT NULL, 
  dataFim date NOT NULL, 
  status enum('agendado', 'em-andamento', 'finalizado'), 
  PRIMARY KEY(id)
)

CREATE TABLE IF NOT EXISTS TiposVendas(
  id INT NOT NULL, 
  descricao VARCHAR(100) NOT NULL, 
  PRIMARY KEY(id)
)
