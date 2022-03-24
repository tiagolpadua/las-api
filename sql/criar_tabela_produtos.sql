CREATE TABLE `Produto`(
`id` INTEGER PRIMARY KEY  AUTOINCREMENT,
 `nome` VARCHAR(255) NOT NULL,
 `fk_categoria` BIGINT NOT NULL,
 `preco` DECIMAL NOT NULL,
 FOREIGN KEY(`fk_categoria`) REFERENCES `Categoria`(`id`)
);