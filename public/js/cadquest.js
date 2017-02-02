 var autor;

    //Pega o ano atual e define como valor mínimo do compo ano de criação
    $(function(){
      var currentYear = (new Date).getFullYear();
      $('#criacao').attr('max', currentYear);

        /*-------------------------------------------- 
          ajaxCall : FAZ REQUISICAO AJAX PELO POST
              uri  : url que sera chamada
              obj  : dados que serao enviados
              asnc : se será assincrono ou nao
        ----------------------------------------------*/

        function ajaxCall(uri, obj = " ", asnc = true ,callback) {
          return $.ajax({                                                               // Retorna o Resultado da funcao ajax
            url: uri,                                                                   // Url que será direcionado 
            type: "POST",                                                               // Tipo de envio
            dataType: "json",                                                           // Tipo de dado que será enviado
            data: JSON.stringify({
            obj
            }), //dados enviados

            contentType: "application/json",                                            // Tipo de dados passados
            cache: false,                                                               // Nega cache ao browser
            timeout: 5000,                                                              // Espera até 5000 mls 
            async: asnc
          });

        }



    //Carrega disciplina de acordo com o autor

    $.when(ajaxCall("/pesqDiscProfII")).done(function(disciplinas) {
        if (disciplinas[0]){
            $("#disciplina").empty();
            $("#disciplina").append($("<option disabled selected value='' />").val('Disciplina').text('Disciplina'));
            for(var i = 0; i < disciplinas.length; i++) {                                                                      //Loop para que que o campo com id=disciplina receba o resultado da requisição ajax
              $("#disciplina").append($("<option />").val(disciplinas[i]).text(disciplinas[i]));
            }
        }

    });




    //Carrega matéria de acordo com a disciplina

      $("#disciplina").change(function(){                                                                                     //Função a ser executada quando houver alteração da disciplina

        var disciplina = $('#disciplina').val();

        $("#materia").empty();
        $("#materia").append($("<option disabled selected value='' />").val('Materia').text('Materia'));



              ajaxCall("/pesquisarMateria", disciplina).done(function(discs){

            for(var i = 0; i < discs.length; i++){                                                                            //Loop para preencher os campos das matérias
              $("#materia").append($("<option />").val(discs[i]).text(discs[i]));
            }
    });

      });


    //Carrega os campos de respostas e gabarito
  
      $("#tipo").change(function(){                                                                                                                                                                         //função que será executada quando o tipo for selecionado

        var tipo = $('#tipo').val();
        $("#dadosQuest").empty();

        if (tipo == "Discursiva") {                                                                                                                                                                         //caso a questão seja discursiva, será colocado no HTML o código do append
          $('#dadosQuest').append($('<textarea name="gabarito" rows="10" class="form-control" style="resize: none; width:610px;" placeholder="Gabarito" required/>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));

          $('#dadosQuest').append($('<input type="number" name="nLinhas" value="" placeholder="Linhas para resposta" class="form-control" style="width:200px;" min="1" required/>'));
          $('#dadosQuest').append(" ");
          $('#dadosQuest').append(" ");

          $('#dadosQuest').append($('<label"/>')
          .append($('<br><input type="checkbox" name="linhasAparentes" class="form-control lnAppear" style="margin-left:5%; margin-right:1%" />'))
          .append('<span class="lnAppearSpn" >Linhas aparentes?</span>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));
        }

        else if (tipo == "Objetiva") {                                                                                                                                                                       //caso a questão seja objetiva, os appends abaixo serão inseridos no HTML
          $('#dadosQuest').append($('<input type="text" class="opsCadQuest form-control" name="opcA" value="" placeholder="Opção A" class="form-control" style="width:610px;" required/>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));

          $('#dadosQuest').append($('<input type="text" class="opsCadQuest form-control" name="opcB" value="" placeholder="Opção B" class="form-control" style="width:610px;" required/>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));

          $('#dadosQuest').append($('<input type="text" class="opsCadQuest form-control" name="opcC" value="" placeholder="Opção C" class="form-control" style="width:610px;" required/>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));

          $('#dadosQuest').append($('<input type="text" class="opsCadQuest form-control" name="opcD" value="" placeholder="Opção D" class="form-control" style="width:610px;" required/>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));

          $('#dadosQuest').append($('<input type="text" class="opsCadQuest form-control" name="opcE" value="" placeholder="Opção E" class="form-control" style="width:610px;" required/>'));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));

          $('#dadosQuest').append($('<select class="form-control" name="gabarito" style="width:110px;" required/>')
            .append($('<option disabled selected value=""/>').val("Gabarito").text("Gabarito"))
            .append($('<option/>').val("Opção A").text("Opção A"))
            .append($('<option/>').val("Opção B").text("Opção B"))
            .append($('<option/>').val("Opção C").text("Opção C"))
            .append($('<option/>').val("Opção D").text("Opção D"))
            .append($('<option/>').val("Opção E").text("Opção E")));
          $('#dadosQuest').append($('<br />'));
          $('#dadosQuest').append($('<br />'));
        }

        $('#dadosQuest').append($('<button type="submit" name="cadastrar" class="btn btn-default btCadQuest">').val("Cadastrar").text("Cadastrar"));                                                      //botão de cadastrar questão (independentemente do tipo de questão selecionada)

      });
    });
