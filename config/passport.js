/*
  CONFIGURACOES DO PASSPORT.JS
*/
'use strict';                                                           // Modo strito
var crypto = require('crypto');                                         // Api pra criptografia
var fs = require('fs');                                                 // File I/O do NodeJs
var mysql                =   require('mysql');                          
var LocalStrategy        =   require('passport-local').Strategy;        // Api para login/cadastro/autenticacao
var connDB               =   mysql.createConnection({                   // Seta conexao ao BD
  host        :'localhost',
  user        :'root',
  password    :'',
  database    :'sge'
});

var genRandomString = function(length){                                 // Gera uma string randomica para ser o futuro salt
          return crypto.randomBytes(Math.ceil(length/2))
                       .toString('hex')                                 // Converte para Hexadecimal
                       .slice(0,length);                                // Retorna a qtde requerida de  caracteres
};
var sha512 = function(password, salt){                                  // Gera o hash 
    var hash = crypto.createHmac('sha512', salt);                       // Hash SHA512
    hash.update(password);                                              // Faz o ato 
    var value = hash.digest('hex');             
    return {
        salt:salt,
        passwordHash:value
    };
};
function saltHashPassword(senha) {                                      // Funcao Criadora do hashpras senhas
    var salt = genRandomString(16);                                     // Gera o Salt, tamanho da salt = 16
    var passwordData = sha512(senha, salt);                             // Gera a pass com base no salt
    return passwordData;                                                // Retorna o que foi gerado
}



connDB.connect(function(err){                                           // Testa conexao com o BD
  if(!err){ console.log("Funcionou... \n");
}else{
  console.log("Err0r... \n");
}

});

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {                         // Gera dados que possam ser obtidos depois em outros requests pela serializacao, like 'session'
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {                       // Retorna perfil do usuario reconhecido
    done(null, user);
  });
  passport.use('cadastro', new LocalStrategy({                          // Módulo para o cadastro, campos padroes: 

    usernameField     :   'email',  
    passwordField     :   'senha',
    passReqToCallback :   true                                          // Pode retornar tudo do
  },
  function(req, email, password, done) {                                // Callback

    var passTMP     = saltHashPassword(password);                       // Geram o hash de senha
    var senhaCrypt  = passTMP.passwordHash;
    var matricula   = req.body.matricula;
    var salt        = passTMP.salt;

    connDB.query("select * from usuario where matricula = '"+ matricula +"'",function(err,rows){  // Checa se o usuario já existe
      if (err)
      return done(err);
      if (rows.length) {
        return done(null, false, req.flash('MSGCad', 'Usuario já cadastrado '));                  // Retorna msg de erro caso sim
      } else {                                                                                    // Grava no BD
        var insertUser = "INSERT INTO usuario ( matricula,username,salt,senha,permissao ) values ('" + matricula +"','" + req.body.nome +"','"+salt+"','" + senhaCrypt +"','"+ req.body.categoria +"')";
        connDB.query(insertUser,function(err,rows){});
        if(req.body.categoria == "Professor")                                                     //Sendo Professor, tbm poem na tabela certa. 
        {                         
          var insertProf  =   "INSERT INTO profs (matricula, nome, data_nasc, cpf, tel_cel, email) values ('" + req.body.matricula +"','" + req.body.nome +"','" + req.body.data +"','" + req.body.cpf +"','" + req.body.celular +"','"+ email +"') "
          connDB.query(insertProf,function(err,rows){
            console.log(err);
            return done(null,  req.flash('MSGLogin', 'Dados Gravados com sucesso'));
          });

        }
      }
    });
  }));


  passport.use('login', new LocalStrategy ({                                                      // Strategy para o login
    usernameField     : 'matricula',
    passwordField     : 'senha',
    passReqToCallback : true
  },
  function(req, matricula, password, done) {                                                      // Callback

    // var senhaCrypt   =  saltHashPassword(password);                                               // Encrypta a senha, Nem uso mais
   
   // Pega os dados do banco                                 
    connDB.query("select usuario.matricula, username,salt, senha, permissao, photoID, tel_cel,email,cpf,DATE_FORMAT(data_nasc,'%d/%m/%Y') AS  data_nasc from usuario, user_photo,profs where user_photo.matricula ='" + matricula +"' AND profs.matricula ='" + matricula +"' AND   usuario.matricula ='" + matricula +"'  ",function(error, rows, fields){
      if(!!error)
      return done(error);
      if (rows[0]){                                                                               // Se existir decripto , checo, a senha
      var passwordData = sha512(password, rows[0].salt);
          if (!(rows[0].senha == passwordData.passwordHash)) {
          return done(null, false, req.flash('MSGLogin', 'Oops! Senha errada.'));
          }
      }else  return done(null, false, req.flash('MSGLogin', 'Usuário nao cadastrado.'));

      var usuario = new Object();                                                            //Cria um objeto com o usuario, mas é uma variavel das trevas. YOU SHALL NOT TOUCH IT
      usuario.id    = rows.Matricula;

      return done(null,rows[0]);
    });
  }));





























};
