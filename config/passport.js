// config/passport.js
'use strict';
var crypto = require('crypto');
var fs = require('fs');
var mysql                =   require('mysql');
var LocalStrategy        =   require('passport-local').Strategy;
var connDB               =   mysql.createConnection({
  host        :'localhost',
  user        :'root',
  password    :'',
  database    :'sge'
});

var genRandomString = function(length){
          return crypto.randomBytes(Math.ceil(length/2))
                       .toString('hex')   //Converte para Hexadecimal
                       .slice(0,length);  //Retorna a qtde requerida de  caracteres
};
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); //Hash SHA512
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
function saltHashPassword(senha) {
    var salt = genRandomString(16); /* tamanho da salt = 16 */
    var passwordData = sha512(senha, salt);
    return passwordData;
    console.log('UserPassword = '+senha);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('\nSalt = '+passwordData.salt);
}


//tipo isso, sim, isso ai é o que iniciainstancia o boanco.
connDB.connect(function(err){                                                         //Inicia e testa connec com o BD
  if(!err){ console.log("Funcionou... \n");
}else{
  console.log("Err0r... \n");
}

});

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {                                      //Requeridos para a autenticação pelo passport
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use('cadastro', new LocalStrategy({

    usernameField     :   'email',
    passwordField     :   'senha',
    passReqToCallback :   true                                                      // pode retornar tudo do
  },
  function(req, email, password, done) {

    var passTMP =  saltHashPassword(password);
    var senhaCrypt   =  passTMP.passwordHash;
    var matricula    =   req.body.matricula;
    var salt = passTMP.salt;
    console.log(matricula);
    console.log(senhaCrypt);
    console.log(salt);

    console.log(req.body.data);
    console.log(req.body.cpf);



                                             //Var teste pra pegar o valor  do html
    connDB.query("select * from usuario where matricula = '"+ matricula +"'",function(err,rows){
      if (err)
      return done(err);
      if (rows.length) {
        return done(null, false, req.flash('MSGCad', 'Questão já cadastrada '));
      } else {
        var insertUser = "INSERT INTO usuario ( matricula,username,salt,senha,permissao ) values ('" + matricula +"','" + req.body.nome +"','"+salt+"','" + senhaCrypt +"','"+ req.body.categoria +"')";
        connDB.query(insertUser,function(err,rows){});
        if(req.body.categoria == "Professor")
        {
          var insertProf  =   "INSERT INTO profs (matricula, nome, data_nasc, cpf, tel_cel, email) values ('" + req.body.matricula +"','" + req.body.nome +"','" + req.body.data +"','" + req.body.cpf +"','" + req.body.celular +"','"+ email +"') "
          connDB.query(insertProf,function(err,rows){
            console.log(err);
            console.log(insertProf);
            return done(null,  req.flash('MSGLogin', 'Dados Gravados com sucesso'));
          });

        }
      }
    });


  }));


  passport.use('login', new LocalStrategy ({
    usernameField     : 'matricula',
    passwordField     : 'senha',
    passReqToCallback : true
  },
  function(req, matricula, password, done) {

    var senhaCrypt   =  saltHashPassword(password);
   // console.log(senhaCrypt);

    var photo="";
    connDB.query("select usuario.matricula, username,salt, senha, permissao, photoID, tel_cel,email,cpf,DATE_FORMAT(data_nasc,'%d/%m/%Y') AS  data_nasc from usuario, user_photo,profs where user_photo.matricula ='" + matricula +"' AND profs.matricula ='" + matricula +"' AND   usuario.matricula ='" + matricula +"'  ",function(error, rows, fields){
      if(!!error)
      return done(error);
      if (rows[0]){
      var passwordData = sha512(password, rows[0].salt);
          if (!(rows[0].senha == passwordData.passwordHash)) {
          return done(null, false, req.flash('MSGLogin', 'Oops! Senha errada.'));
          }
      }else
      return done(null, false, req.flash('MSGLogin', 'Usuário nao cadastrado.'));

      var usuario = new Object();                                                            //Cria um objeto com o usuario, mas é uma variavel das trevas. YOU SHALL NOT TOUCH IT
      usuario.id    = rows.Matricula;







      return done(null,rows[0]);
    });
  }));





























};
