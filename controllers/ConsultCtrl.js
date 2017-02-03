var connDB = require('../models/mysqlmodule.js');


function sqlPesquisar(qry, callback){
    connDB.query(qry, function(err,rows){
      if (err) return callback(err);

      return callback(null,rows);
 });
}

exports.buscaNotas = function(req, res){

  var notas = [];
  var x = req.body.trimestre;
  var disciplina = req.body.disciplina;
  var d = new Date();
  var n = d.getFullYear();

  if(x == '4')        var camposSelecionados = "tri4";
  else                var camposSelecionados = "`ttri"+x+"`, `ptri"+x+"`";

  var query = "SELECT "+camposSelecionados+" FROM `aluno_nota_tri` INNER JOIN aluno ON aluno_nota_tri.matricula = aluno.matricula WHERE disciplina_id = (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+disciplina+"') AND ano = '"+n+"' ORDER BY nome";
console.log(query);
  connDB.query(query, function(err,rows){
    if (err)
    req.flash('MSGCadQuest', err);
    if (rows.length > 0) {

      for (var i = 0, len = rows.length; i < len; i++) {
        notas.push(rows[i]);
      }
      console.log(notas);
      res.json(notas);
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

exports.pesquisarMateria = function(req, res){
  var materias = [];
  console.log(req.body.obj);
  connDB.query("SELECT * FROM `materia`, disciplinas WHERE materia.disciplina_id = disciplinas.disciplina_id AND disciplinas.disciplina_nome = '"+ req.body.obj +"'",function(err,rows){
    if (err){
      req.flash('MSGCadQuest', err);}
    if (rows.length) {
      for (var i = 0, len = rows.length; i < len; i++) {
        materias.push(rows[i].nome);
      }
      res.json(materias);
    }
  });

};

exports.LoadNts = function(req,res){
  var dados = [];                                                                     // Futuros Resultados
  var qry ="SELECT ID,content FROM lembretes WHERE user = '"+req.user.matricula+"'";  // qry

  sqlPesquisar(qry, function (err, rows){                                             // Função que faz a pesquisa no banco de dados 
    if (err) console.log(err);    
    if (rows.length) {
      for (var i = 0, len = rows.length; i < len; i++) {
        dados.push([rows[i].content,rows[i].ID]);
      }
    }
    res.json(dados);
  });

};
exports.GetNotas = function(req,res){
  var aluno_data_turma=[];

  var sql="SELECT DISTINCT turma.cod_turma FROM turma, prof_turma WHERE matricula = '"+req.user.matricula+"' AND turma.cod_turma = prof_turma.cod_turma";
  sqlPesquisar(sql, function (err, rows){                                             // Função que faz a pesquisa no banco de dados 
    if (rows.length) {
      for (var i = 0; i < rows.length; i++) {
        aluno_data_turma.push([rows[i].cod_turma]);
      }
      var aluno_data = [];
      var sql2="SELECT nota FROM prof_turma, aluno_nota  WHERE prof_turma.matricula = '"+req.user.matricula+"' AND prof_turma.cod_turma ='"+aluno_data_turma+"' ";
           sqlPesquisar(sql2, function (err, rows){
              if(err) console.log(err);
              if (rows.length) {
                for (var i = 0, len = rows.length; i < len; i++) {
                  aluno_data.push([rows[i].nota]);
                }
                res.json(aluno_data);
              }
           });

    }
  });
};
exports.pesquisateste   =   function(req, res){

  console.log(req.body.autor + req.body.nivel + req.body.tipo + req.body.disciplina + req.body.materia + req.body.creation + req.body.serie);

  var x = 0; // Variável pra controlar o número de condições 0 = Nenhuma condição

  var condicaoAutor = "";
  var condicaoNivel = "";
  var condicaoTipo = "";
  var condicaoDisciplina = "";
  var condicaoMateria = "";
  var condicaoAno = "";
  var condicaoSerie = "";
  var possivelAND = "";
  //Cria a condição WHERE de autor
  if(!(req.body.autor == '' || req.body.autor == null || req.body.autor == undefined || req.body.autor == 'Autor')){//Só entra se estiver preenchido (serve pra todos os ifs principais abaixo)
    var condicaoAutor = " autor= (SELECT `matricula` FROM `profs` WHERE nome = '" + req.body.autor + "')";
    x++;
  }

  //Cria a condição WHERE de nível
  if(!(req.body.nivel == '' || req.body.nivel == null || req.body.nivel == undefined || req.body.nivel == 'Nível')){
    if(x>0) {var condicaoNivel = " AND";} //Esse if testa se já existe alguma outra condição
    condicaoNivel += " nivel= '" + req.body.nivel + "'";
    x++;
  }

  //Cria a condição WHERE de tipo
  if(!(req.body.tipo == '' || req.body.tipo == null || req.body.tipo == undefined || req.body.tipo == 'Tipo')){
    if(x>0) {var condicaoTipo = " AND";}
    condicaoTipo += " tipo = '"+ req.body.tipo +"'";
    x++;
  }

  //Cria a condição WHERE de disciplina
  if(!(req.body.disciplina == '' || req.body.disciplina == null || req.body.disciplina == undefined || req.body.disciplina == 'Disciplina')){
    if(x>0) {var condicaoDisciplina = " AND";}
    condicaoDisciplina += " disciplina_id = (SELECT `disciplina_id` FROM `disciplinas` WHERE disciplina_nome = '"+ req.body.disciplina +"')";
    x++;
  }

  //Cria a condição WHERE de matéria
  if(!(req.body.materia == '' || req.body.materia == null || req.body.materia == undefined || req.body.materia == 'Matéria')){
    if(x>0) {var condicaoMateria = " AND";}
    condicaoMateria += " materia_id = (SELECT `materia_id` FROM `materia` WHERE nome = '"+ req.body.materia +"')";
    x++;
  }

  //Cria a condição WHERE de ano de criação
  if(!(req.body.creation == '' || req.body.creation == null || req.body.creation == undefined)){
    if(x>0) {var condicaoAno = " AND";}
    condicaoAno += " ano_letivo = '"+ req.body.creation +"'";
    x++;
  }


  //Cria a condição WHERE de série
  if(!(req.body.serie == '' || req.body.serie == null || req.body.serie == undefined || req.body.serie == 'Série')){
    if(x>0) {var condicaoSerie = " AND";}
    condicaoSerie += " anoserie = '"+ req.body.serie +"'";
    x++;
  }

  // Testa se tem alguma condição
  if(x>0){
    var possivelAND = " AND ";
  }


  //Junta todas as condições do where
  whereClause = "WHERE" + condicaoAutor + condicaoNivel + condicaoTipo + condicaoDisciplina + condicaoMateria + condicaoAno + condicaoSerie + possivelAND + "(autor = '"+  req.user.matricula +"' || visibilidade = 'Púb')";

  var questoes = [];
  var qry =  "SELECT questoes.enunciado, questoes.gabarito, questoes.cod_quest, questoes.autor FROM questoes "+ whereClause +" GROUP BY enunciado" ;

  console.log(qry);

  connDB.query(qry,function(err,rows){
    if (err)
    req.flash('MSGCadQuest', err);

    if (rows.length) {

      for (var i = 0, len = rows.length; i < len; i++) {
        questoes.push([rows[i].cod_quest, rows[i].enunciado, rows[i].gabarito, rows[i].autor ]);
      }

      console.log(questoes);
      res.json(questoes);
    }
  });
};


exports.pesquisaProfessores	=	function(req, res){

  var professores = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var qry = "SELECT `nome` FROM `profs` ORDER BY nome";
  connDB.query(qry,function(err,rows){
    if (err)
    req.flash('MSGCadQuest', err);

    if (rows.length) {

      for (var i = 0, len = rows.length; i < len; i++) {
        professores.push(rows[i].nome);
      }

      console.log(professores);
      res.json(professores);
    }
  });


};


exports.listalunos	=	function(req, res){

  var listaalunos = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var qry = "select nome, aluno.matricula from aluno, turma_aluno where cod_turma = '"+req.body.nometurma+"' AND aluno.matricula=turma_aluno.matricula ORDER BY nome";
  connDB.query(qry,function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {
        //console.log()
        //listaalunos.push(rows[i].nome);
        listaalunos.push([rows[i].nome, rows[i].matricula]);
        //nunes, é aqui que deveria pegar os nomes ? sim, e jogar na array tbm. vejamos cod_turma nao é nome..... mt bem observado
         }
  res.json(listaalunos);

  });


};

exports.pesquisaturma	=	function(req, res){
  var consulTurmas = [];                                                                                   // ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var sql= "select distinct cod_turma from prof_turma where matricula = '"+req.user.matricula+"'  ";       // Query 
  sqlPesquisar(sql, function (err, rows){                                                                  // Função que faz a pesquisa no banco de dados 
    if (err) console.log(err);    
      for (var i = 0; i < rows.length; i++)                                                                // Preenche o array do resultado
      {

        consulTurmas.push(rows[i].cod_turma);
      }
      res.json(consulTurmas);
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
/*
exports.pesquisaDiscProf = function(req, res){


  var consulDisc = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  connDB.query("select disciplina from prof_turma where matricula = '"+req.body.matricula+"' ",function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {

        consulDisc.push( rows[i].disciplina );
      }
      console.log(consulDisc);
  res.json(consulDisc);

  });


};
*/
exports.pesquisaQuest = function(request, response){
  var questoes = [];

  connDB.query("SELECT questoes.enunciado, questoes.nivel, questoes.tipo, questoes.cod_quest FROM `questoes`, disciplinas, materia WHERE materia.nome = '"+ request.body.materia + "' AND materia.materia_id = questoes.materia_id AND (autor = '"+ request.user.matricula +"' || visibilidade = 'Púb') GROUP BY enunciado",function(err,rows){
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





exports.pesquisaDiscProfTurma = function(request, res){

  var test = request.body.nometurma;
  console.log(test);
  var disciplinas = [];
  var query = "SELECT DISTINCT `disciplina_nome` FROM prof_turma, `disciplinas`, professor_disciplinas"+
  " WHERE professor_disciplinas.disciplina_id = disciplinas.disciplina_id AND professor_disciplinas.matricula = '"+ request.user.matricula +"' AND prof_turma.cod_turma='"+request.body.nometurma+"'";
console.log(query);
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



exports.provaquests = function(req, res){

  var consulquests = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var consultipos  = [];
  var questoes     = [];

      connDB.query("select questoes.tipo,questoes.cod_quest,enunciado, op1,op2,op3,op4,op5, quant_linhas, linhas_visiveis from questoes, prova_questoes where prova_questoes.cod_prova = '"+ req.body.variola +"' AND questoes.cod_quest = prova_questoes.cod_quest  ",function(err,rows){
        for (var i = 0, len = rows.length; i < len; i++)
          {
            var tmp = {};
            tmp['tipo'] =rows[i].tipo;
            tmp['cod_quest'] =rows[i].cod_quest;
            tmp['enunciado'] = rows[i].enunciado;
            tmp['op1'] = rows[i].op1;
            tmp['op2'] = rows[i].op2;
            tmp['op3'] = rows[i].op3;
            tmp['op4'] = rows[i].op4;
            tmp['op5'] = rows[i].op5;
            tmp['quant_linhas'] = rows[i].quant_linhas;
            tmp['linhas_visiveis'] = rows[i].linhas_visiveis;

            questoes.push(tmp);
      }

      res.json(questoes);

  });
};

exports.pegaPresenca   =   function(req, res){

      var dadosTable = [];
      var data= req.body.txtSelectedDate;
      var datasplit = data.split("/");
      var dataFormatada = datasplit[2] +'-'+ datasplit[1] +'-'+ datasplit[0];


      var qry = "SELECT DISTINCT nome, aluno.matricula, presente, comentario,prof_diario.cod_aula "+
                "FROM aluno, turma_aluno, prof_diario_aluno,prof_diario"+
                " WHERE cod_turma = '"+req.body.nometurma+"' AND prof_diario.matricula='"+req.user.matricula+"' AND cod_turma=prof_diario.turma"+
                      " AND aluno.matricula=turma_aluno.matricula AND aluno.matricula =  prof_diario_aluno.matricula and prof_diario.data = '"+ dataFormatada +"' AND prof_diario.turma='"+req.body.nometurma+"'       and prof_diario.matricula ='"+req.user.matricula+"'                            AND  prof_diario.horaStart='"+req.body.initHour+"' AND prof_diario.disciplina_id IN (SELECT disciplinas.disciplina_id from disciplinas where disciplina_nome LIKE'"+req.body.disciplina+"')"+
                      " AND prof_diario.cod_aula=prof_diario_aluno.cod_aula ORDER BY nome";
       console.log(qry);
       connDB.query(qry,function(err,rows){
         if (err)
         req.flash('MSGCadQuest', err);
         if (rows.length) {

                  for (var i = 0, len = rows.length; i < len; i++) {
                     dadosTable.push([rows[i].nome, rows[i].matricula, rows[i].presente,rows[i].comentario ]);
                  }
                     dadosTable.push([rows[0].comentario ]);

                  console.log(dadosTable);
                  res.json(dadosTable);
         }
         else{


  var listaalunos = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var qry2 = "select DISTINCT nome, aluno.matricula from aluno, turma_aluno where cod_turma = '"+req.body.nometurma+"' AND aluno.matricula=turma_aluno.matricula ORDER BY nome";
  connDB.query(qry2,function(err,rows){
    for (var i = 0, len = rows.length; i < len; i++)
      {
        //console.log()
        //listaalunos.push(rows[i].nome);
        listaalunos.push([rows[i].nome, rows[i].matricula]);

        //nunes, é aqui que deveria pegar os nomes ? sim, e jogar na array tbm. vejamos cod_turma nao é nome..... mt bem observado
            }
                     listaalunos.push(['  ']);

  res.json(listaalunos);

  });



         }
       });
};

exports.consulProva = function(req, res){

  console.log("--------------------------------!@#!@#!@#");
  console.log(req.body.autor);

  var x = 0;//Vc vai entender daqui a pouco

  var whereDiscPart = "";
  var  andSerie = "";
  var andTipo = "";
  var andMuchaCosaAutor = "";
  var possivelWhere = "";


  if(!(req.body.disciplina == "" || req.body.serie == null || req.body.serie == undefined))
   {
     whereDiscPart =  " provas.cod_disciplina = (SELECT disciplina_id FROM disciplinas WHERE disciplina_nome =  '" + req.body.disciplina + "')"+
                          " AND disciplinas.disciplina_id= provas.cod_disciplina";
     x++;
   }

   if(!(req.body.serie == "" || req.body.serie == null || req.body.serie == undefined))
   {
     if (x > 0) {
       andSerie = " AND";
     }
     andSerie += " provas.anoserie = '" + req.body.serie + "'";
     x++;
   }



   if(!(req.body.tipo == "" || req.body.tipo == null || req.body.tipo == undefined))
   {
     if (x >0) {
       andTipo = " AND";
     }
     andTipo += " tipo_avaliacao = '" + req.body.tipo + "'";
     x++;
   }

   if(!(req.body.autor == "" || req.body.tipo == null || req.body.tipo == undefined))
   {
     if (x >0) {
       andMuchaCosaAutor = " AND";
     }
     andMuchaCosaAutor += " provas.matricula IN (SELECT matricula FROM profs where nome = '" + req.body.autor + "' )";

   }

   if (x > 0) {
     possivelWhere = "WHERE";
   }

   var resolveSporra =  " provas.cod_disciplina = (SELECT disciplina_id FROM disciplinas '" + whereDiscPart + "') AND"

  var listaalunos = [];  // AQUI FOI CRIADO UM ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var qry = "SELECT DISTINCT provas.nome, provas.tipo_avaliacao, provas.anoserie, provas.matricula, cod_prova  FROM provas, profs, disciplinas  WHERE " + possivelWhere + whereDiscPart +  andSerie + andTipo + andMuchaCosaAutor;
  console.log(qry);
  connDB.query(qry,function(err,rows){
      for (var i = 0, len = rows.length; i < len; i++)
        {
          //console.log()
          //listaalunos.push(rows[i].nome);
        listaalunos.push([rows[i].nome, rows[i].tipo_avaliacao, rows[i].anoserie, rows[i].cod_prova]);

            }
            console.log(listaalunos);
  res.json(listaalunos);

  });


};
/*----------------- calendario ----------------------*/
exports.pesquisaEvento  = function(req, res){
    var eventos = [];
    var dataHj = new Date().toJSON().split('T'); //Pega a Data do dia da pessoa
    var qry = "SELECT  `cod_evento`, `evento`, `descricao`, `datahora`, `cor`, `cor2`,`turma`,`datafim`, `allday`" +
              " FROM `calendario`" +
              "WHERE `matricula`='"+req.user.matricula+"' AND datahora > '"+dataHj[0]+"' ORDER BY datahora DESC LIMIT 10 ";

 sqlPesquisar(qry, function (err, rows){  
    if(err) console.log(err);

    for (var i = 0, len = rows.length; i < len; i++)
    {
        eventos.push({
          cod_evento  : rows[i].cod_evento,
          title       : '',
          titulo      : rows[i].evento,
          descricao   : rows[i].descricao,
          startsAt    : rows[i].datahora,
          endsAt      : rows[i].datafim,
          allday      : rows[i].allday,
          turma       : rows[i].turma,
          actions     : '',
          cor         : '',
          color:{
            primary   : rows[i].cor,
            secondary : rows[i].cor2
          }
        });
    }
    res.json(eventos);
 });

};


/*

  var consulTurmas = [];                                                                                   // ARRAY QUE VAI COMPORTAR OS RESULTADOS .
  var sql= "select distinct cod_turma from prof_turma where matricula = '"+req.user.matricula+"'  ";       // Query 
  sqlPesquisar(sql, function (err, rows){                                                                  // Função que faz a pesquisa no banco de dados 
    if (err) console.log(err);    
      for (var i = 0; i < rows.length; i++)                                                                // Preenche o array do resultado
      {

        consulTurmas.push(rows[i].cod_turma);
      }
      res.json(consulTurmas);
  });


*/


//     var lines = process.stdout.getWindowSize()[1];
//      for(var i = 0; i < lines; i++) {
//          console.log('\r\n');
//          console.log('\r\n');
//          console.log('\r\n');
//
//      }
