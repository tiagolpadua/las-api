const express = require("express");
const consign = require("consign");
const bodyParser= require("body-parser");

module.exports =() =>{
    const app= express();

    app.use(bodyParser.urlencoded({extend:true}));
    app.use(bodyParser.json());
    
    consign()
        .include("controllers")
        .into(app);

    return app;
};