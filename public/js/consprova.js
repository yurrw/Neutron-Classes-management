  $(function pesqProfs(){                                                                                     //Pesquisa os professores ao carregar a página
    $.post("/pesqProfs",function(data){
      $("#autor").empty();                                                                                    //limpa a lista de professores
      $("#autor").append($("<option selected disabled/>").val('Autor').text('Autor'));                        //adiciona os professores a tabela
      for(var i = 1; i < data.length; i++) {
        $("#autor").append($("<option />").val(data[i]).text(data[i]));
        //console.log(data[i]);
      }});
  });

  $( function() {
    $("#tableProvasSelecionadas").hide();                                                                  //esconde a tableProvasSelecionadas
  });



  $(function pesqDisciplina(){                                                                          //psquisa as disciplinas
    $.post("/pesqDisc",function(data){
      $("#disciplina").empty();
      $("#disciplina").append($("<option disable selected />").val('Disciplina').text('Disciplina'));   //adiciona as disciplinas ao select
      for(var i = 0; i < data.length; i++) {
        $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
        //console.log(data[i]);
      }
    });
  });

  $(function(){
    $("#consultarProva").click(function(){                                                                              //função consulta a prova confore o formulario preenchido
      var buscafiltrada = [$("#autor").val(), $("#disciplina").val(), $("#serie").val(), $("#tipo").val()];

      /***********************
      condicionais referentes ao preenchimento do formulario
      ************************/

      if(buscafiltrada[0] != "" && buscafiltrada[0] != null){ var autor = buscafiltrada[0];}
      else{var autor = "";}

      if(buscafiltrada[1] != "" && buscafiltrada[1] != "Disciplina" && buscafiltrada[1] != null){ var disciplina = buscafiltrada[1];}
      else{var disciplina = "";}

      if(buscafiltrada[2] != "" && buscafiltrada[2] != "Série" && buscafiltrada[2] != null) { var serie = buscafiltrada[2];}
      else{ var serie = "";}

      if(buscafiltrada[3] != "" && buscafiltrada[3] != "Tipo" && buscafiltrada[3] != null){ var tipo = buscafiltrada[3];}
      else{ var tipo = "";}

      console.log("------------------------");
      console.log(autor);
      console.log(disciplina);
      console.log(serie);
      console.log(tipo);

      var table = document.getElementById('tableProvasSelecionadas');
      var dados = [];
      alert(table.rows.length);
      for(var r = 1; r < table.rows.length; r++)
        dados[r] = table.rows[r].cells[1].innerHTML;

      $.ajax({                                                                                      //faz a requisisãopra consulta
        url: "/consultandoProva",  // AQUI É A URL QUE SERA ENVIADO
        type: "POST",   //TIPO DE ENVIO
        dataType: "json", //TIPO DE DADO QUE SERA PASSADO
        data:JSON.stringify({                                                   //envia os dados para consulta
          dados : dados,
          autor : autor,
          disciplina : disciplina,
          serie : serie,
          tipo : tipo
        }),
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        success: function(data) {
          //console.log(disciplina);
          //console.log('process sucess');
          $("#tbprova").empty();
          for(var i = 0; i < data.length; i++) {
            $("#tbprova").append($("<tr/>")                                                             //adiciona os dados as celulas
             .append($("<td />").val(data[i][1]).text(data[i][0]))
             .append($("<td />").val(data[i][0]).text(data[i][3]))
             .append($("<td />").val(data[i][0]).text(data[i][1]))
             .append($("<td />").val(data[i][2]).text(data[i][2]))
             .append($("<td  />")
             .append("<button type='button' class='btn btn-danger id = 'gen' onclick = 'doIt(this)' name = '"+i+"'>Gerar PDF</button>")
            ));
            //console.log(data[i]);
          }
          $("#tableProvasSelecionadas").show();
          },
          error: function() {
            console.log('process error');
          },
        });
    });
  });

  var novaRow = [];                                                                                     //objeto contador de linhas

  function doIt(element) {
    var table = document.getElementById('tableProvasSelecionadas');
    var row =table.rows.length;
    // console.log(row);
    console.log("------------"+table.rows[row-1].cells[1].innerHTML);

    var nomeTMP = row-1;
    var nome= String(nomeTMP);
    var nome2= JSON.stringify(nomeTMP);

    $.ajax({                                                                                            //requisição
      url: "/getprova",  // AQUI É A URL QUE SERA ENVIADO
      type: "POST",   //TIPO DE ENVIO
      dataType: "json", //TIPO DE DADO QUE SERA PASSADO
      data:JSON.stringify({
        variola: nomeTMP
      }),
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      complete: function() {/*console.log('process complete');*/},
      success: function(data) {
        console.log('----');
        console.log(data.length);

        console.log('***********');

        //TREATAMENTO DOS DADOS
        var ginha =[];
        var num = 1;
        var linhas ="______________________________________________________________________________________\n";
        var spc = "\n"
        var nlinhas = "";
        for(var i=0; i< data.length ;i++)
        {
          switch (data[i].tipo) {                                                                         //condicional do modo como será impresso no pdf as questoes
            case "Discursiva":
              if(data[i].linhas_visiveis == '1')
              {
                var number = parseInt(data[i].quant_linhas);
                console.log(number);
                ginha[i]=num+")" + data[i].enunciado+"\n\n";
                for(var j=0; j< number ;j++)
                {
                  nlinhas += linhas;
                }
                ginha[i] = ginha[i]+ nlinhas+"\n\n";
                num++;
                nlinhas = "";
                break;
              }
              else
              {
                var number = parseInt(data[i].quant_linhas);
                console.log(number);
                ginha[i]=num+")" + data[i].enunciado+"\n\n";
                for(var j=0; j< number ;j++)
                {
                  nlinhas += spc;
                }
                ginha[i] = ginha[i]+ nlinhas+"\n\n";
                num++;
                nlinhas = "";
                break;
              }

            case "Objetiva":
              // alert("2");
              ginha[i]=num+") "+data[i].enunciado+"\n\n"+"a) "+data[i].op1+"\n"+"b) "+data[i].op2+"\n"+"c) "+data[i].op3+"\n"+"d) "+data[i].op4+"\n"+"e) "+data[i].op5+"\n\n";
              num++;
              break;
          }
        }
        /*************************************************************************

          CABEÇALHO PARA IMPRESSO DO PDF

        **************************************************************************/
        var cab = [];
        cab [0] = "COLÉGIO PEDRO II     -     CAMPUS SÃO CRISTÓVÃO III                                               NOTA:\n";
        cab [1] = "COORDENADOR: ______________________________                  \n";
        cab [2] = "PROFESSOR: ________________________________         DATA:      /      /\n";
        cab [3] = "ALUNO: _____________________________________         TURMA: ________   N°: ___\n\n\n";

        var pdfdoc = { content: [cab,ginha, ], }                                                                          //insere os dados no arquico pdf: capechalho e corpo
        pdfMake.createPdf(pdfdoc).open();                                                                                 //abre o aquivo pdf
        //console.log('process sucess');
      },
      error: function() {console.log('process error : consulta para gerar pdf ');  },
    });

  }
