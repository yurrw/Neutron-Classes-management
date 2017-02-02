
    $(function(){
      $('#textCont').hide();                                                                                                          //esconde texttbox do título do email
      $('#textAreas').hide();                                                                                                         //esconde texttbox do conteúdo do email
      $('#btAreas').hide();                                                                                                           //esconde botão de enviar email
      $('#contact').hide();                                                                                                           //esconde botão de contatar turma
      $('#tabelaAlunos').hide();                                                                                                      //esconde tabela de alunos

      /*--------------------------------------------
        ajaxCall : FAZ REQUISICAO AJAX PELO POST
            uri  : url que sera chamada
            obj  : dados que serao enviados
      ----------------------------------------------*/

      $.ajax({
        url: "/mostraturma",                                                                                                           // Url que será direcionado
        type: "POST",                                                                                                                  // Tipo de envio
        dataType: "json",                                                                                                              // Tipo de dado que será enviado
        contentType: "application/json",                                                                                               // Tipo de dados passados
        cache: false,                                                                                                                  // Nega cache ao browser
        timeout: 5000,                                                                                                                 // Espera até 5000 mls
        complete: function() {},
        success: function(data) {
          for (var i = 0 ; i < data.length; i++) {$('#nometurma').append("<option>"+data[i].toString()+"</option>");}
        },
        error: function() {console.log('process error mostraturma');},
      });
      $("#MsgconsTurma").hide();
      $("#btAreas").click(function(){
        $.ajax({
          url: "/enviaremail",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          cache: false,
          data:JSON.stringify({
            turman   : $("#nometurma").val() ,
            emailCT  : $("#textAreas").val() ,
            tituloCT : $("#textCont").val(),
          }),
          timeout: 5000,
          complete: function() {},
          success: function(data) {
            $("#MsgconsTurma").show();
          },
          error: function() {
            $("#MsgconsTurma").show();
          },
        });
      });
    });


    $( function(){
      $("#nometurma").change(function(){                                                                                            //função executada ao selecionar o nome da turma
      $('#tabelaAlunos').show();
        var  nometurma = $('#nometurma').val();
        $.ajax({
          url: "/pegaaluno",
          type: "POST",
          dataType: "json",
          data:JSON.stringify({
            nometurma : nometurma
          }),
          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function() {console.log('process complete :/pegaaluno');},
          success: function(data) {

            console.log(data);
            var alunos=[];
            alunos = data;
            $("#tbturma").empty();
            for(var i = 0; i < data.length; i++) {
              $("#tbturma").append($("<tr/>")
                .append($("<td class='cellMeio' style='width:5%'/>").val(i+1).text(i+1))                                           //adiciona dados às celulas
                .append($("<td class='cellMeio' style='width:20%'/>").val(data[i][1]).text(data[i][1]))                            //adiciona dados às celulas
                .append($("<td class='' style='width:75%'/>").val(data[i][0]).text(data[i][0]))                                    //adiciona dados às celulas
                // .append($("<td />").val(data[i][2]).text(data[i][2]))
              );
              console.log(data[i]);                                                                                               //mostra as infoemações no console
              $("#contact").show();                                                                                               //exibe botao Contatar Turma
            }
            console.log('process sucess');
          },
          error: function() { console.log('process error');},
        });
      });
    });

    $(document).on('click', '#contact', function(){                                                                               //evento executado ao clicar para contatar a turma
      if($("#textCont").is(":hidden")){                                                                                           //condicional pra executa a função
        $('#contact').text("Não contatar");                                                                                       //exibe um texto botão
        $('#textCont').show();                                                                                                    //exibe contreudo texto
        $('#textAreas').show();                                                                                                   //exibe textoarea
        $('#btAreas').show();                                                                                                     //exibe o botao
      }
      else {                                                                                                                      //condicional pra executa a função
        $('#contact').text("Contatar turma");                                                                                     //exibe um texto botão
        $('#textCont').hide();                                                                                                    //esconte o conteudo texto
        $('#textAreas').hide();                                                                                                   //esconde textoarea
        $('#btAreas').hide();                                                                                                     //esconde botao
      }

    });

    // $( function(){
    //   $("#contact").on('click', function(){
    //     console.log("Aheooooooooooo");
    //     );
    // });


    // $(document).on('change', '[type=checkbox]',function(e){
    //   var umaChecked = $('input[name="chk"]:checked').length > 0;
    //   if (umaChecked){ //NAO TA CERTO MASSSSSSSSSS FUNCIONA
    //     $('#textCont').show();
    //     $('#textAreas').show();
    //     $('#btAreas').show();
    //   }
    //   else{
    //     $('#textCont').hide();
    //     $('#textAreas').hide();
    //     $('#btAreas').hide();
    //   }
    // });
