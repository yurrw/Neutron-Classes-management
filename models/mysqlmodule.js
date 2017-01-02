//Caiu em desuso
var mysql       = require('mysql');
var connDB               =   mysql.createConnection({
  host        :'localhost',
  user        :'root',
  password    :'',
  database    :'sge'
});


module.exports = connDB;
