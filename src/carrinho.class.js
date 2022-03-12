const { CarrinhoDeCompras } = require("./objetos");
class Carrinho extends CarrinhoDeCompras {
  constructor(produtos = []) {
    super(produtos);
  }
  imprimir() {
    return this.produtos;
  }
}

module.exports = { Carrinho };
