const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");

const ENV = process.env.NODE_ENV;

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get("/",(req, res) => res.send("Bem-Vindo ao LAS-API"));

  consign().include("src/controllers").into(app);

  
  app.use((err, req, res) => {
    //Erro interno
    if(err.erroApp){
      console.log("Erro interno");
      res.status(400).send(err.erroApp);

      //Error em Ambiente que nao eh de produçao
    }else if (ENV !== "production") {
      console.log("Error em Ambiente que nao eh de produçao");
      res.status(500).send({ error: "err.message" });

      //Error em produçao
    }else{
      console.log("Error em produçao");
      res.status(500).send({ error: "Algo deu errado..." });
    }
    
    console.log(err);
  });

  return app;
};
