var connDB     = require('../models/mysqlmodule.js');
var multer     = require('multer');
var crypto     = require('crypto');
var nodemailer = require('nodemailer');


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


exports.attPass = function(req, res){
  // console.log(req.user);
  var passwordData = sha512(req.body.oldOne, req.user.salt);
      if (req.user.senha === passwordData.passwordHash)
        {
          var passTMP      =  saltHashPassword(req.body.newOne);
          var senhaCrypt   =  passTMP.passwordHash;
          var salt         =  passTMP.salt;
          var qry          = "UPDATE usuario SET salt='"+salt+"', senha='"+senhaCrypt+"' WHERE matricula='"+req.user.matricula+"'  ";

          connDB.query(qry,function(err,rows){
            if(err) console.log(err);
          })

            res.json("updated");
        }
          else {
            console.log("Merdas diferentes");
            res.json("wrong");

      }
};
exports.UpFoto = function(req,res){
   var archName ="";

     var fs = require('fs');



      var guardar =   multer.diskStorage({
                            destination: function (req, file, callback) {
                              callback(null, './uploads');
                            },
                            filename: function (req, file, callback) {



                          console.log("------------------------------------------");

                          var matriculando=    req.user.matricula;
                          var fileName    =    file.originalname;
                          var ext         =    fileName.split(".");

                          var date = new Date();
                          var data = Date.now();
                          archName =  '-' + file.fieldname + '-' + data +'.'+ext[1];
                          console.log(archName);
                          console.log("------------------------------------------");

                              // archName =  matrs + '-' + file.fieldname + '-' + data +'.'+ext[1];

                              callback(null, archName);
                          /*
                          var d = new Date(year, month, day, hour, minute, second, millisecond);
                          */
                        }
                    });

    var upload = multer({ storage : guardar}).any();

         upload(req,res,function(err) {
                                        if(err) {
                                            console.log(err);
                                            return res.end("Error uploading file.");
                                        } else {

                                          // console.log(req.body);

                                           matrs = req.user.matricula;
                                        var archName_Copy= './uploads/'+matrs+archName;
                                        var upcurl= '/uploads/'+matrs+archName;

                                            fs.rename('./uploads/'+archName , archName_Copy, function(err) {
                                                if ( err ) console.log('ERROR NA COPIA : ' + err);
                                            });



                       var qry= "UPDATE user_photo SET photoID ='"+upcurl+"' Where matricula= '"+req.user.matricula+"' " ;
                       console.log(qry);
                       connDB.query(qry,function(err,rows){
                         if (err)
                           console.log(err);


                          console.log("UPOU NAS CARALHA");

                     });
//                                                              return res.render();
  return                                          res.render('paginas/index',{	user: req.user.username,userMat: req.user.matricula, photoID: req.user.photoID, email: req.user.email, data_nasc: req.user.data_nasc, tel_cel: req.user.tel_cel,  senha: req.user.senha });
                                        //@TODO: uma pagina de atualizar perfil mesmo, nao um modal.
                                        }
              });

// console.log('hi');
// var sql = "UPDATE usuario SET username ='"+req.body.nome+"' Where matricula= '"+req.user.matricula+"' ";
// var sql2 = "UPDATE user_photo`SET photoID ='"+req.body.nome+"' Where matricula= '"+req.user.matricula+"' ";
// var sql3 = "UPDATE profs SET nome ='"+req.body.nome+"',data_nasc='"+req.body.dnasc+"', tel_cel='"+req.body.tel_cel+"',email='"+req.body.email+"'  Where matricula= '"+req.user.matricula+"' ";
// console.log(process);

//     connDB.query(sql,function(err,rows){
//       if (err)
//         console.log('errou');

//       console.log('oi');
//       req.user.username=req.body.nome;
//       user =req.body.nome;
//       console.log(req.user);
//     // res.render('paginas/index',{ user: req.user.username,userMat: req.user.matricula, photoID: req.user.photoID, email: req.user.email, data_nasc: req.user.data_nasc, tel_cel: req.user.tel_cel,  senha: req.user.senha });

//     });
};

exports.UpdatePerfil = function(req,res){
// console.log('hi');
 var sql = "UPDATE usuario SET username ='"+req.body.nome+"' Where matricula= '"+req.user.matricula+"' ";
 var sql2 = "UPDATE profs SET nome ='"+req.body.nome+"',data_nasc='"+req.body.data_nasc+"', tel_cel='"+req.body.tel_cel+"',email='"+req.body.email+"'  Where matricula= '"+req.user.matricula+"' ";
 console.log(sql2);

     connDB.query(sql,function(err,rows){
       if (err)
         console.log('errou');

      // console.log('oi');
         //@TODO : Retirar o parametro 'rows'
         connDB.query(sql2,function(err,rows)
         {
           if(err)
             console.log("erro");

             res.json("dadosAtualizados");

         });
     //     req.user.username=req.body.nome;
     //     user =req.body.nome;
     //     console.log(req.user);
     //     res.render('paginas/index',{ user: req.user.username,userMat: req.user.matricula, photoID: req.user.photoID, email: req.user.email, data_nasc: req.user.data_nasc, tel_cel: req.user.tel_cel,  senha: req.user.senha });
     });

};
exports.pesquisaDisc = function(req, res){

  var disciplinas = [];
  var query = "SELECT DISTINCT disciplina_nome FROM `disciplinas`  ORDER BY disciplinas.disciplina_nome ";

  connDB.query(query, function(err,rows){
    if (err)
    req.flash('MSGCadQuest', err);
    if (rows.length) {

      for (var i = 0, len = rows.length; i < len; i++) {
        disciplinas.push(rows[i].disciplina_nome);
      }
      console.log(disciplinas);
      res.json(disciplinas);
    }

  });
};

exports.pesquisaDiscProf = function(request, res){

  var disciplinas = [];
  var query = "SELECT `disciplina_nome` FROM `disciplinas`, professor_disciplinas"+
  " WHERE professor_disciplinas.disciplina_id = disciplinas.disciplina_id AND professor_disciplinas.matricula = '"+ request.user.matricula +"'";

  connDB.query(query, function(err,rows){
    if (err)
    req.flash('MSGCadQuest', err);
    if (rows.length) {

      for (var i = 0, len = rows.length; i < len; i++) {
        disciplinas.push(rows[i].disciplina_nome);
      }
      res.json(disciplinas);
    }

  });
};

exports.pesquisaMat = function(request, res){
  var materias = [];

  connDB.query("SELECT * FROM `materia`, disciplinas WHERE materia.disciplina_id = disciplinas.disciplina_id AND disciplinas.disciplina_nome = '"+ request.body.disciplina +"'",function(err,rows){
    if (err){
      request.flash('MSGCadQuest', err);}
    if (rows.length) {
      for (var i = 0, len = rows.length; i < len; i++) {
        materias.push(rows[i].nome);
      }
      res.json(materias);
    }
  });
};

exports.pesquisaQuest = function(request, response){
  var questoes = [];
  console.log(request.body.materia);

  connDB.query("SELECT questoes.enunciado, questoes.nivel, questoes.tipo, questoes.cod_quest FROM `questoes`, disciplinas, materia WHERE materia.nome = '"+ request.body.materia + "' AND materia.materia_id = questoes.materia_id AND (autor = '"+ request.username +"' || visibilidade = 'Púb') GROUP BY enunciado",function(err,rows){
    if (err)
    request.flash('MSGCadQuest', err);
    if (rows.length) {
      for (var i = 0, len = rows.length; i < len; i++) {
        questoes.push([rows[i].enunciado, rows[i].nivel, rows[i].tipo, rows[i].cod_quest]);
      }
      response.json(questoes);
    }
  });
};

exports.cadastroDiario  = function(request,response, next){
  var data          = request.body.txtSelectedDate;
  var datasplit     = data.split("/");
  var dataformatada = datasplit[2] +'-'+ datasplit[1] +'-'+ datasplit[0];
  var confirm       = 0;
  var qry           = "INSERT INTO prof_diario(matricula,turma,data,disciplina_id,comentario) SELECT '"+request.user.matricula+"','"+request.body.turma+"','"+dataformatada+"',disciplina_id , '"+request.body.comentario +"' from disciplinas where disciplina_nome= '"+request.body.disciplina+"' ";
  var qryDEL        = "DELETE FROM prof_diario WHERE turma = '"+request.body.turma+"' AND matricula = '"+request.user.matricula+"' AND disciplina_id = '"+request.body.nomedisciplina+"' AND data = '"+dataformatada+"' AND comentario = '"+request.body.textAreas+"'";
  var qry2DEL       = "DELETE FROM prof_diario_aluno WHERE cod_aula IN (SELECT cod_aula FROM prof_diario WHERE turma = '"+request.body.turma+"' AND matricula = '"+request.user.matricula+"' AND disciplina_id = '"+request.body.nomedisciplina+"' AND data = '"+dataformatada+"' AND comentario = '"+request.body.textAreas+"'";
  console.log(qryDEL);
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(qry2DEL);
  console.log("------------------------------------");

  connDB.query(qryDEL,function(err,rows){
    if (err)
        console.log(err);



});

connDB.query(qry2DEL,function(err,rows){
  if (err)
      console.log(err);

});

    connDB.query(qry,function(err,rows){
      if (err)
          console.log(err);

          console.log("chegou aqui");

        confirm=1;


        if(confirm==1){
          for(var i=0; i<request.body.matriculas.length; i++){

               var qry2=" INSERT INTO prof_diario_aluno (cod_aula,matricula,presente) SELECT prof_diario.cod_aula,'"+request.body.matriculas[i]+"', '"+request.body.chks[i]+"'  FROM   prof_diario   WHERE   prof_diario.matricula ='"+request.user.matricula+"'                            AND     prof_diario.data='"+dataformatada+"'  AND     prof_diario.turma='"+request.body.turma+"'"
               console.log(qry2);
                  connDB.query(qry2,function(err,rows){
                    if(err){
                  console.log('Error connecting to Db');
                  return;
                  }
                  console.log('Connection established');

                      });
                  }
        }
  });

};



exports.cadastroProva   = function(request, response, next){
  var dados = request.body.dados;
  var qry= "INSERT INTO `provas`(`nome`, `matricula`, `cod_disciplina`, `anoserie`, `tipo_avaliacao`)  SELECT '"+request.user.matricula+"', `matricula`,`disciplina_id` , '"+ request.body.serie +"','"+ request.body.tipo +"' FROM `profs`,`disciplinas` WHERE nome = '"+ request.user.username +"' AND  disciplina_nome = '"+ request.body.disciplina +"'  " ;
  var confirm= 0;
    console.log(qry);
    console.log(request.user);
  connDB.query(qry,function(err,rows){
    if (err){
      console.log("erro ao inserir la na prova");
    }
    confirm=1;
  });

  if(confirm !=1){
    for(x=1; x<dados.length; x++){
      var qry2= "INSERT INTO `prova_questoes` SELECT provas.cod_prova, questoes.cod_quest FROM provas, questoes WHERE questoes.enunciado = '"+ request.body.dados[x] +"' ";
      connDB.query(qry2,function(err,rows){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
      });
    }
  }
};

exports.cadastroNotas   = function(request, response, next){
  var notas = [];
  notas  = request.body.nota;
  //Deleta se já tiver cadastrado igual
  connDB.query("DELETE FROM `aluno_nota` WHERE tipo_avaliacao = '"+ request.body.avaliacao +"' AND periodo = '"+ request.body.periodo +"' AND ano_letivo = '"+ request.body.ano +"' AND disciplina_id = (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+ request.body.disciplina +"')" ,function(err,rows){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
  });

  //Pega as matrículas
  connDB.query("SELECT aluno.matricula FROM `turma_aluno`, aluno WHERE turma_aluno.cod_turma = '"+ request.body.turma +"' AND aluno.matricula = turma_aluno.matricula GROUP BY aluno.nome ",function(err,rows){
    if (err){
      request.flash('MSGCadQuest', err);
    }
    if (rows.length) {
      for (var i = 0, len = rows.length; i < len; i++) {
        //Insere os dados no BD
        var qry = "INSERT INTO `aluno_nota`(`matricula`, `disciplina_id`, `nota`, `tipo_avaliacao`, `periodo`, `ano_letivo`) SELECT '"+ rows[i].matricula +"', disciplina_id, '"+ notas[i] +"', '"+ request.body.avaliacao +"', '"+ request.body.periodo +"', '"+ request.body.ano +"' FROM `disciplinas` WHERE disciplina_nome = '"+ request.body.disciplina+"'" ;
        connDB.query(qry,function(err,rows){
          if(err){
            console.log('Error connecting to Db');
            return;
          }
        });
      }
    }
  });
  return   response.render('paginas/cadastroNotas', {message: request.flash('MSGCadQuest','Dados Gravados Com sucesso'), user: request.user.username, matricula: request.user.matricula});
};

exports.enviaremail = function(req, res){
  console.log("**********************************************************");
  console.log(req.body.textCont);
  console.log(req.body.textAreas);
  console.log(req.body.turman);
  var emailt = [];
  var emailp = [];
  var queryMailTurma = "SELECT DISTINCT email FROM turma WHERE cod_turma='"+req.body.turman+"'";
  connDB.query(queryMailTurma, function(err,rows){


    if (rows.length) {


        emailt.push(rows[0].email);

      console.log(emailt);

    }

  });

  // var queryMailProf = "SELECT DISTINCT email FROM profs WHERE nome = '"+req.user.username+"'";
  // connDB.query(queryMailProf, function(err,rows){
  //
  //   if (rows.length) {
  //
  //
  //       emailp.push(rows[0].email);
  //
  //     console.log(emailp);
  //
  //   }
  // });

  // var transporter = nodemailer.createTransport('smtps://matheusnunes.games@gmail.com:huntersdream@smtp.gmail.com');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'neutronsge@gmail.com',
        pass: 'ps4>all123'
    }
});


// setup e-mail data with unicode symbols
var mailOptions = {
    from: req.user.username +'<neutronsge@gmail.com>', // sender address
    to: emailt, // list of receivers
    subject: req.body.tituloCT, // Subject line
    text: req.body.emailCT, // plaintext body
    html: req.body.emailCT // html body
};


var errc="";
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        errc = error;
    }
    console.log('Message sent: ' + info.response);
});

  return res.json(errc);

};

exports.cadastroQuest   = function(request, response, next){

  var autor          =    request.user.matricula;
  var visibilidade   =    request.body.visibilidade;
  var disciplina     =    request.body.disciplina;
  var materia        =    request.body.materia;
  var serie          =    request.body.serie;
  var anoC           =    request.body.criacao;
  var tipo           =    request.body.tipo;
  var nivel          =    request.body.star;
  var enunciado      =    request.body.enunciado;
  var gabarito       =    request.body.gabarito;
  var nLinhas        =    request.body.nLinhas;
  var apLinhas;

  console.log(nivel);

  if(request.body.linhasAparentes === undefined){
    apLinhas = false;
  }
  else if (request.body.linhasAparentes == 'on') {
    apLinhas = true;
  }



  connDB.query("select * from questoes where enunciado = '"+ enunciado +"'",function(err,rows){
    if (err){
      request.flash('MSGCadQuest', err);
    } //Aqui ele retorna a msg se a qstao ja existir
    if (rows.length) {
      request.flash('MSGCadQuest', 'Questão já existente!'); //Aqui ele retorna a msg se a qstao ja existir
    }
    else {
      if(tipo == "Discursiva")
      {
        var query  =  "INSERT INTO `questoes`(`autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`," +
                      " `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`, quant_linhas, linhas_visiveis) " +

                      "SELECT '"+ autor +"', '"+ nivel +"', '"+ tipo +"', disciplinas.disciplina_id, materia.materia_id, " +
                      "'"+ enunciado +"', '"+ gabarito +"', '"+ anoC +"', '"+ serie +"', '"+ visibilidade +"', '"+ nLinhas +"', "+ apLinhas +" " +

                      "FROM disciplinas, materia " +

                      "WHERE disciplinas.disciplina_nome = '"+ disciplina +"' AND materia.nome = '"+ materia +"'";

      }
      else if (tipo == "Objetiva") {
        var opcoes = {
          a : request.body.opcA,
          b : request.body.opcB,
          c : request.body.opcC,
          d : request.body.opcD,
          e : request.body.opcE,
         }
        var insertClause  = "INSERT INTO `questoes`(`autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`, `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) ";
        var selectClause  = "SELECT '"+ autor +"', '"+ nivel +"', '"+ tipo +"', disciplinas.disciplina_id, materia.materia_id, '"+ enunciado +"', '"+ opcoes.a +"', '"+ opcoes.b +"', '"+ opcoes.c +"', '"+ opcoes.d +"', '"+ opcoes.e +"', '"+ gabarito +"', '"+ anoC +"', '"+ serie +"', '"+ visibilidade +"' ";
        var fromClause    = "FROM disciplinas, materia ";
        var whereClause   = "WHERE disciplinas.disciplina_nome = '"+ disciplina +"' AND materia.nome = '"+ materia +"'";
        connDB.query(insertClause + selectClause + fromClause + whereClause, function(err,rows){
          if(err){
            request.flash('MSGCadQuest', 'Erro ao cadastrar');
          return  response.redirect('/cadastroQuest');

            }else{
              request.flash('MSGCadQuest', 'Questao Cadastrada!');
              return  response.redirect('/cadastroQuest');


            }
                    });
         var query  =  "INSERT INTO `questoes`(`autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`," +
                       " `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) "; +

                       "SELECT '"+ autor +"', '"+ nivel +"', '"+ tipo +"', disciplinas.disciplina_id, materia.materia_id, " +
                       "'"+ enunciado +"', '"+ opcoes.a +"', '"+ opcoes.b +"', '"+ opcoes.c +"', '"+ opcoes.d +"', '"+ opcoes.e +"', " +
                       "'"+ gabarito +"', '"+ anoC +"', '"+ serie +"', '"+ visibilidade +"' " +

                       "FROM disciplinas, materia " +

                       "WHERE disciplinas.disciplina_nome = '"+ disciplina +"' AND materia.nome = '"+ materia +"'";

      }

      console.log(query);

      connDB.query(query, function(err,rows){
        if(err){
          request.flash('MSGCadQuest', 'Erro ao cadastrar');
        return  response.redirect('/cadastroQuest');
          console.log("ERRO");

          }else{
            request.flash('MSGCadQuest', 'Questao Cadastrada!');
            return  response.redirect('/cadastroQuest');

            console.log("FOI");

          }

      });

    }

      // res.render('index', { messages: req.flash('info') });
      //request.flash('MSGCadQuest', 'Questao Cadastrada!');

  //return   request.flash('MSGCadQuest', 'Dados Gravados com sucesso');

  });

};


//------------------ Calendario-------------------------------------
exports.cadastroEvento   = function(request, response){
  console.log("\ncadastrando Evento - inicio ");
  // console.log(request.body);

  var matricula= request.user.matricula;
  var evento   = request.body.title;
  var descricao= request.body.descricao;
  var date     = request.body.startsAt;
  var datefim  = request.body.endsAt;
  var allday   /*= request.body.allday*/;
  var turma    = request.body.nometurma;
  var cor      = request.body.cor;
  var cor2     /*= request.body.corSecondary*/;



  console.log(request.body);

  if (turma==0 || turma=='undefined' || turma=='?undefined : undefined ?' || turma=='? unde'|| turma=='' ) {
    turma='';
  }


  if     ( cor == 1){ cor="#DC143C";cor2= "#CD5C5C";}
  else if( cor == 2){ cor="#708090";cor2= "#B0C4DE";}
  else if( cor == 3){ cor="#800080";cor2= "#DDA0DD";}
  else if( cor == 4){ cor="#FFD700";cor2= "#EEE8AA";}
  else if( cor == 5){ cor="#4169E1";cor2= "#1E90FF";}
  else if( cor == 6){ cor="#008000";cor2= "#00FA9A";}
  else { cor="#f0f0f0";cor2= "#f0f0f0";}

  if (allday != true) {allday=false;}


  var inserEvento = "INSERT INTO `calendario`(`matricula`, `evento`, `descricao`, `datahora`, `datafim`, `allday`, `cor`, `cor2`, `turma`) VALUES ('"+matricula+"','"+evento+"','"+descricao+"','"+date+"','"+datefim+"','"+allday+"','"+cor+"','"+cor2+"','"+turma+"')";

  connDB.query(inserEvento,function(err,rows){ if (err) request.flash('MSGCadEvento'+matricula+"~"+evento+"~"+date+"~"+cor+"~"+cor2+"~"+descricao+"~"+turma, err);});

  return  response.render('paginas/calendario',{user: request.user.username});


  console.log(" cadastrado Evento - fim\n");
};

exports.editEvento = function(request,response){
  console.log("edit evento - inicio ");
  // console.log(request.body);

  var cod_evento = request.body.cod_evento;
  var op         = request.body.op;

  var matricula= request.user.matricula;
  var titulo   = request.body.titulo;
  var descricao= request.body.descricao;
  var date     = request.body.startsAt;
  var datefim  = request.body.endsAt;
  var allday   /*= request.body.allday*/;
  var turma    = request.body.turma;
  var cor      = request.body.cor;
  var cor2     /*= request.body.corSecondary*/;

  console.log(request.body);

  if     ( cor == 1){ cor="#DC143C";cor2= "#CD5C5C";}
  else if( cor == 2){ cor="#708090";cor2= "#B0C4DE";}
  else if( cor == 3){ cor="#800080";cor2= "#DDA0DD";}
  else if( cor == 4){ cor="#FFD700";cor2= "#EEE8AA";}
  else if( cor == 5){ cor="#4169E1";cor2= "#1E90FF";}
  else if( cor == 6){ cor="#008000";cor2= "#00FA9A";}
  else { cor="#f0f0f0";cor2= "#f0f0f0";}

  if (allday != true) {allday=false;}


  if ( op == 'Deletar'){
    var qry = "DELETE FROM `calendario` WHERE cod_evento = '"+cod_evento+"' and matricula = '"+matricula+"' ";
    connDB.query(qry,function(err,rows){
      if (err) {request.flash('MSGCadEvento'+matricula+"~"+titulo+"~"+date+"~"+cod_evento+"~"+descricao+"~"+turma, err)};
      if (err){ requestrequest.flash('MSGCadQuest', err);}
      else { console.log("\tedit evento : del - fim\n");}
    });
  }
  else if ( op == 'Editar'){
    var qry = "UPDATE `calendario` SET `evento`='"+titulo+"',`descricao`='"+descricao+"',`datahora`='"+date+"',`turma`='"+turma+"', `cor`='"+cor+"',`cor2`='"+cor2+"' WHERE  cod_evento ='"+cod_evento+"' and matricula='"+matricula+"' ";
    connDB.query(qry,function(err,rows){ if (err){ request.flash('MSGCadQuest', err);}
      else { console.log("  edit evento : edit- fim\n");}
    });
  }
  else{console.log("\tedit evento : del erro  leks");}

  return  response.render('paginas/calendario', {user: request.user.username});
};
