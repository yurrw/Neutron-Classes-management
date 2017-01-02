// models/user.js

var bcrypt          =   require('bcrypt-nodejs');
var connDB2         =   require('./models/mysqlmodule');    



function Authenticate(username, password, fn) {
     connDB2.connect();
     var user;
     connDB2.query('SELECT * from usuario where matricula = ' +
         connDB2.escape(username) + ' and senha =' + connDB2.escape(password),
         function(err, rows) {
             user = rows[0].username;
         });
     if (!user) {
         return fn(new Error('cannot find user'));
     } else {
         return fn(null, user);
     }
     connDB2.end();
 }

// generating a hash
var criarHash    = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
var validSenha   = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

