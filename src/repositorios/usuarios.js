const query = require("../infraestrutura/database/queries");

class Usuario {

  adicionar(usuario){
    const sql = "INSERT INTO Usuarios SET ?";
    return query(sql, usuario);
  }

  listar(){
    const sql = "SELECT id, nome, urlFotoPerfil FROM Usuarios";
    return query(sql);
  }

  async buscarPorId(id){
    const [sql] = await query("SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE id = $1", [id]);
    return sql;
  }

  async buscarPorNome(nome){
    const [sql] = await query("SELECT id, nome, urlFotoPerfil FROM Usuarios WHERE nome like ?","%" + nome + "%" );
    return sql;
  }

  alterar(id, dadosAtualizados){
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosAtualizados, id]);
  }
  
  excluir(id){
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    return query(sql,id);
  }

  // Dados Pessoais
  listarDadosPessoais(id){
    const sql = "SELECT nomeCompleto, dataNascimento, rg, cpf FROM Usuarios WHERE id = ?";
    return query(sql, id);
  }

  alterarDadosPessoais(id, dadosPessoaisAtualizados) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql,[dadosPessoaisAtualizados, id]);
  }

  // Contatos
  async listarContatos(id) {
    const [sql] = await query(`SELECT telefone, celular, email FROM Usuarios WHERE id = ${id}`);
    return sql;
  }

  alterarContatos(id, dadosContatosAtualizados){
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";
    return query(sql, [dadosContatosAtualizados, id]);
  }

  // Senha
  alterarSenha(id, dadosSenhaAtualizada) {
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";

    return query(sql, [dadosSenhaAtualizada, id]);
  }

  // Endereço
  async listarEndereco(id){
    
    const [sql] = await query(`SELECT cep, endereco, numero, complemento, bairro FROM Usuarios WHERE id = ${id}`);

    return sql;
  }

  alterarEndereco(id, dadosEnderecoAtualizada){
    const sql = "UPDATE Usuarios SET ? WHERE id = ?";

    return query(sql, [dadosEnderecoAtualizada, id]);
  }


  isNomeUsuarioUtilizado(nome){
    const sql = "SELECT * FROM Usuarios WHERE nome = ?";
    return query(sql, nome).then((data) => {
      if (data.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }
   
}

module.exports = new Usuario();