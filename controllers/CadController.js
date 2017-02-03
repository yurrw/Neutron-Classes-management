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

}


function TxtToJson(callback , fileTxt){
 
  var fs = require('fs')
    , fileName = arguments[1]  //o mesmo que fileTxt
    , conteudo;

  fs.readFile(fileTxt, 'utf8' , function( err, data)
    {
        console.log("callback1")

        if (err) return callback(err);

        conteudo = data.split('\r\n');
   return callback(null, conteudo);


    });
   
}
function sqlQuery(qry, callback){
    connDB.query(qry, function(err,rows){
      if (err) return callback(err);

      return callback(null,rows);
 });
}
function sqlInsert(qry){
  console.log(qry);
    connDB.query(qry, function(err,rows){
      if(err) return err;

    });
}
function writeLog(data){
  const fs = require('fs');
var date = new Date();
var hora_agora = date.getTime();

  fs.writeFile('./tmp/LOGS'+hora_agora+'.txt' , data , function (err){
    if (err) return console.log(err);

    console.log("LOG GRAVADO");
  });

}
exports.putBD = function(req, res){


  
   sqlQuery(req.body.obj , function (err){
      if (err)   res.status(204).end();

     writeLog(req.body.obj + " ---POR :" + req.user.matricula);
   });
   
}
exports.upFile = function(req, res){
  var  logs = [];
  var fileUploaded = req.file.path;
  // console.log( req.body.tabelaName)
  TxtToJson( function (err, content)
  {
   sqlQuery("SHOW COLUMNS from "+req.body.tabelaName+" ", function(err, fields){
      for(k in content){
        var lineTMP = content[k].split(/\s{5}/g) ;
        tamLine = lineTMP.length;
        for(x in lineTMP){
           lineTMP[x] = '"'+lineTMP[x]+'"';
        }
        if ( tamLine ==fields.length)
         {
            var query = "INSERT INTO "+req.body.tabelaName+" VALUES ("+lineTMP+")";
            console.log(query);
            logs[k] = "Linha "+k+" inserida com sucesso \n";

            sqlInsert(query);

         }
         else {

          console.log("Faltando campos na linha:" + k);
           logs[k]="Faltando campos na linha:" + k +"\n" ;
         }
        }
        writeLog(logs);
  });

  }, fileUploaded)

  res.status(204).end();

}
exports.deleteBD = function(req,res){
  var fileUploaded = req.file.path;

    TxtToJson( function (err, content)
  {
     for(k in content){

    var lineTMP = content[k].split(/\s{5}/g) ;


    
      var del =   "Delete from "+req.body.tabelaNameDel+" where "+lineTMP[0]+"='"+lineTMP[1]+"'";
    sqlInsert(del, function(err, fields){
        if (err){ }
    });
    
  }
  }, fileUploaded)


  res.status(204).end();
}

exports.SaveNts = function(req,res){

  var dados = [];
  var qryDEL = "DELETE FROM lembretes WHERE user = '"+req.user.matricula+"'";
      sqlInsert(qryDEL, function(err, fields){
        if (err){console.log("erro ao dar delete no banco:"+err); }
      });

  for (var i=0; i< req.body.obj.length ; i++){
    var qry = "INSERT INTO `lembretes`( `ID`,`user`, `content`)  VALUES ('"+req.body.obj[i].id+"','"+req.user.matricula+"','"+req.body.obj[i].conteudo+"')";
    sqlInsert(qry);
  }

  return   res.status(204).end();

};

exports.DelNts  = function (req,res){
    var qryDEL = "DELETE FROM lembretes WHERE user = '"+req.user.matricula+"' AND ID='"+req.body.obj+"'";

    // connDB.query(qryDEL, function(err,rows){if(err)console.log("erro ao dar delete no banco:"+err);});

}

exports.findTables = function(rq, rs) {
  const qry = "SHOW TABLES IN sge";
  var tabelas =[];
    connDB.query(qry, function(err,rows){
    if (err) rq.flash('MSGCadQuest', err);

    if (rows.length) {

      for (var i = 0, len = rows.length; i < len; i++) {
        tabelas.push(rows[i].Tables_in_sge);
      }
      rs.json(tabelas);
    }


  });
  // res.status(204).end();


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
            console.log("Diferentes");
            res.json("wrong");

      }
};

exports.removerQuest   =  function(req, res){
      var questoes = [];
      var qry =  "DELETE FROM `questoes` WHERE cod_quest = '"+ req.body.codigo_quest +"'" ;
      connDB.query(qry,function(err,rows){
        if (err)
        req.flash('MSGCadQuest', err);
        else {
          console.log("Deletado! ");
        }
      });
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


                              callback(null, archName);

                        }
                    });

    var upload = multer({ storage : guardar}).any();

         upload(req,res,function(err) {
              if(err) {
                  console.log(err);
                  return res.end("Error uploading file.");
              } else {
                  matrs = req.user.matricula;
                  var archName_Copy= './uploads/'+matrs+archName;
                  var upcurl= '/uploads/'+matrs+archName;
                  
                  fs.rename('./uploads/'+archName , archName_Copy, function(err) {
                      if ( err ) console.log('ERROR NA COPIA : ' + err);
                    });
                  
                  var qry= "UPDATE user_photo SET photoID ='"+upcurl+"' Where matricula= '"+req.user.matricula+"' " ;
                      connDB.query(qry,function(err,rows){
                         if (err)
                           console.log(err);
                     });
//                                                           
  return  res.render('paginas/index',{  user: req.user.username,userMat: req.user.matricula, photoID: req.user.photoID, email: req.user.email, data_nasc: req.user.data_nasc, tel_cel: req.user.tel_cel,  senha: req.user.senha });
                               
                                        }
              });


};

exports.UpdatePerfil = function(req,res){
 var sql = "UPDATE usuario SET username ='"+req.body.nome+"' Where matricula= '"+req.user.matricula+"' ";
 var sql2 = "UPDATE profs SET nome ='"+req.body.nome+"',data_nasc='"+req.body.data_nasc+"', tel_cel='"+req.body.tel_cel+"',email='"+req.body.email+"'  Where matricula= '"+req.user.matricula+"' ";
 console.log(sql2);

     connDB.query(sql,function(err,rows){
       if (err)
         console.log('errou');

         connDB.query(sql2,function(err,rows)
         {
           if(err)
             console.log("erro");

             res.json("dadosAtualizados");

         });
     });

};


exports.cadnotas = function(req, res) {
    var matricula = req.body.matAlunos;
    var tri = req.body.tri;
    var disciplina = req.body.disciplina;
    var notaProva = req.body.notaProva;
    var notaTeste = req.body.notaTeste;
          var d = new Date();
          var n = d.getFullYear();
    for (var i = 0; i < matricula.length; i++) {

      console.log("Loop: " + i);
      var select = "";

      //Checa se já existe no banco
      var select = "SELECT * FROM aluno_nota_tri WHERE ano='"+n+"' AND  matricula ='" + matricula[i] + "' AND  disciplina_id IN (SELECT disciplina_id  FROM  disciplinas WHERE  disciplina_nome = '" + disciplina + "')";
      connDB.query(select, function(err, rows){
        if (err) console.log(err);
        console.log(rows);

        //Se existir, dá update
        if (rows.length > 0) {
          //4o trimestre só tem uma avaliação -> query diferente
          if (tri == '4') {
            var update = "UPDATE aluno_nota_tri SET  tri4 =" + notaProva[this.i] + " WHERE matricula =" + matricula[this.i] + " AND ano='"+n+"'AND  disciplina_id IN (SELECT disciplina_id  FROM  disciplinas WHERE  disciplina_nome = '" + disciplina + "' )";
          }
          //Query para outros trimestres
          else {
            var update = "UPDATE aluno_nota_tri SET  ttri" + tri + " =" + notaTeste[this.i] + ", ptri" + tri + " =" + notaProva[this.i] + " WHERE matricula =" + matricula[this.i] + " AND ano='"+n+"'AND  disciplina_id IN (SELECT disciplina_id  FROM  disciplinas WHERE  disciplina_nome = '" + disciplina + "' )";
          }
          console.log(update);
          connDB.query(update, function(err, rows) {
            if (err) console.log(err);

          });

          //Se não existir, dá insert
        } else {
          //4o trimestre só tem uma avaliação -> query diferente
          if (tri == '4') {
            var insert = "INSERT INTO `aluno_nota_tri`(`matricula`, `disciplina_id`, `tri4`, ano) SELECT '" + matricula[this.i] + "', disciplina_id,'" + notaProva[this.i] + "','" + n + "' FROM disciplinas WHERE disciplina_nome = '" + disciplina + "' ";
          }
          //Query para outros trimestres
          else {
            var insert = "INSERT INTO `aluno_nota_tri`(`matricula`, `disciplina_id`, `ttri" + tri + "`, `ptri" + tri + "`, ano) SELECT '" + matricula[this.i] + "', disciplina_id,'" + notaTeste[this.i] + "','" + notaProva[this.i] + "','" + n + "' FROM disciplinas WHERE disciplina_nome = '" + disciplina + "' ";
          }
          console.log(insert);
          connDB.query(insert, function(err, rows) {

          });
        }
      }.bind({
        i: i
      }));

    }

  res.json("dadosAtualizados");

};


exports.cadastroDiario  = function(request,response, next){
  var data          = request.body.txtSelectedDate;
  var datasplit     = data.split("/");
  var dataformatada = datasplit[2] +'-'+ datasplit[1] +'-'+ datasplit[0];
  var confirm       = 0;
  var qry           = "INSERT INTO prof_diario(matricula,turma,data,horaStart,disciplina_id,comentario) SELECT '"+request.user.matricula+"','"+request.body.turma+"','"+dataformatada+"','"+request.body.initHour+"',disciplina_id , '"+request.body.comentario +"' from disciplinas where disciplina_nome= '"+request.body.nomedisciplina+"' ";
  var qryDEL        = "DELETE FROM prof_diario WHERE turma = '"+request.body.turma+"' AND matricula = '"+request.user.matricula+"' AND disciplina_id IN (SELECT disciplinas.disciplina_id from disciplinas where disciplina_nome LIKE '"+request.body.nomedisciplina+"') AND data = '"+dataformatada+"' AND  horaStart= '"+request.body.initHour+"'";
  var qry2DEL       = "DELETE FROM prof_diario_aluno WHERE cod_aula IN (SELECT cod_aula FROM prof_diario WHERE turma = '"+request.body.turma+"' AND matricula = '"+request.user.matricula+"' AND disciplina_id = '"+request.body.nomedisciplina+"' AND data = '"+dataformatada+"' AND horaStart = '"+request.body.initHour+"')";


  connDB.query(qry2DEL,function(err,rows){
    if (err)
        console.log(err);



});

connDB.query(qryDEL,function(err,rows){
  if (err)
      console.log(err);

});

    connDB.query(qry,function(err,rows){
      if (err)
          console.log(err);

          console.log("chegou aqui");
          console.log(qry);
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
  var qry= "INSERT INTO `provas`(`nome`, `matricula`, `cod_disciplina`, `anoserie`, `tipo_avaliacao`)  SELECT '"+request.body.nomeP+"', `matricula`,`disciplina_id` , '"+ request.body.serie +"','"+ request.body.tipo +"' FROM `profs`,`disciplinas` WHERE nome = '"+ request.user.username +"' AND  disciplina_nome = '"+ request.body.disciplina +"'  " ;
  var confirm= 0;
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

  var emailt = [];
  var emailp = [];
  var queryMailTurma = "SELECT DISTINCT email FROM turma WHERE cod_turma='"+req.body.turman+"'";
  connDB.query(queryMailTurma, function(err,rows){


    if (rows.length) {


        emailt.push(rows[0].email);


    }

  });


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'neutronsge@gmail.com',
        pass: 'ps4>all123'
    }
});


// Email configs
var mailOptions = {
    from: req.user.username +'<neutronsge@gmail.com>', // Endereço de email
    to: emailt, // para
    subject: req.body.tituloCT, // Titulo
    text: req.body.emailCT, // corpo
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
      request.flash('MSGCadQuest', 'Questão já existente!');
      return  response.redirect('/cadastroQuest');
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
        var query  = "INSERT INTO `questoes`(`autor`, `nivel`, `tipo`, `disciplina_id`, `materia_id`, `enunciado`,"+
                      " `op1`, `op2`, `op3`, `op4`, `op5`, `gabarito`, `ano_letivo`, `anoserie`, `visibilidade`) "+
                      "SELECT '"+ autor +"', '"+ nivel +"', '"+ tipo +"', disciplinas.disciplina_id, materia.materia_id, "+
                      "'"+ enunciado +"', '"+ opcoes.a +"', '"+ opcoes.b +"', '"+ opcoes.c +"', '"+ opcoes.d +"', '"+ opcoes.e +"'"+
                      ", '"+ gabarito +"', '"+ anoC +"', '"+ serie +"', '"+ visibilidade +"' "+
                      "FROM disciplinas, materia "+
                      "WHERE disciplinas.disciplina_nome = '"+ disciplina +"' AND materia.nome = '"+ materia +"'";
      }

  

      connDB.query(query, function(err,rows){
        if(err){
          request.flash('MSGCadQuest', 'Erro ao cadastrar');
          console.log(err);
        return  response.redirect('/cadastroQuest');

          }else{
            request.flash('MSGCadQuest', 'Questao Cadastrada!');
            return  response.redirect('/cadastroQuest');

            console.log("FOI");

          }

      });

    }


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
