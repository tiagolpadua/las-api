class Tables {
    init(conection) {
      this.conection = conection;
  
      this.createUser();
    }
  
    createUser() {
      const sql =
        "CREATE TABLE IF NOT EXISTS users (id integer NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, urlFotoPerfil varchar(2083) NOT NULL, PRIMARY KEY(id))";
  
      this.conection.query(sql, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Table created successfully");
        }
      });
    }
  }
  
  module.exports = new Tables;