const conexao = require("../../sql/conection");

class User {
  add(user, res) {

    const isInvalidName = user.name.length < 5;
    
    const validations = {
        name: "user",
        valid: isInvalidName,
        message: "The name must be at least 5 characters long"
    };

    const errorExist = validations.isInvalidName;


    if(errorExist) {
      res
        .status(400)
        .json(validations.message);
    } else {

      const sql = "INSERT INTO users SET ?";
    
      conexao.query(sql, (erro) => {
        if(erro) {
          res
            .status(400)
            .json(erro);
        } else {
          res
            .status(200)
            .json(user);
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM users";

    conexao.query(sql, (erro, results) => {
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json(results);
      }
    });
  }

  searchById(id, res) {
    const sql = `SELECT * FROM users WHERE id=${id}`;

    conexao.query(sql, (erro, results) => {
      const user = results[0];
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json(user);
      }
    });
  }

  alter(id, values, res) {

    const sql = "UPDATE users SET ? WHERE id=?";

    conexao.query(sql, [values, id], (erro) =>{
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json({...values, id});
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM users WHERE id=?";

    conexao.query(sql, id, (erro) => {
      if(erro) {
        res
          .status(400)
          .json(erro);
      } else {
        res
          .status(200)
          .json({id});
      }
    });
  }
}

module.exports = new User;