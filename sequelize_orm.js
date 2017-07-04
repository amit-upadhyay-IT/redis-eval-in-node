var Sequelize = require("sequelize");

// make sure you have created the database using pg Admin III 
var sequelize = new Sequelize("postgres://huxutede:CqOxnhGdwEiEhtdmh7y54YgSG3ncnRq3@babar.elephantsql.com:5432/huxutede");

var Article = sequelize.define("article", {
    title: Sequelize.STRING,
    content: Sequelize.STRING
});

sequelize.sync({
    logging: console.log,
});

//var Sequelize = require("sequelize");
// var connection = new Sequelize("10.250.18.50", "exponentia_readonly", "exponentia_readonly~", {
//     dialect: 'mysql'|'sqlite'|'postgres'|'mssql'
// });
