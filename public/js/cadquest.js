 var autor;

    //Pega o ano atual e define como valor mínimo do compo ano de criação
    $(function(){
      var currentYear = (new Date).getFullYear();
      $('#criacao').attr('max', currentYear);
    });



    //Carrega disciplina de acordo com o autor
    $( function() {





        $.ajax({
          url: "/pesqDiscProfII",  // AQUI É A URL QUE SERA ENVIADO
          type: "POST",   //TIPO DE ENVIO
          dataType: "json", //TIPO DE DADO QUE SERA PASSADO

          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function() {
            console.log('process complete');
          },
          success: function(data) {
            console.log(disciplina);
            console.log('process sucess');
            $("#disciplina").empty();
            $("#disciplina").append($("<option disabled selected value='' />").val('Disciplina').text('Disciplina'));
            for(var i = 0; i < data.length; i++) {
              $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
              console.log(data[i]);
            }
          },

          error: function() {
            console.log('process error');
          },
        });

    });


    //Carrega matéria de acordo com a disciplina
    $(function() {
      $("#disciplina").change(function(){

        var disciplina = $('#disciplina').val();

        $("#materia").empty();
        $("#materia").append($("<option disabled selected value='' />").val('Materia').text('Materia'));

        console.log(disciplina);

        $.ajax({
          url: "/pesqMat",  // AQUI É A URL QUE SERA ENVIADO
          type: "POST",   //TIPO DE ENVIO
          dataType: "json", //TIPO DE DADO QUE SERA PASSADO
          data:JSON.stringify({
            disciplina: disciplina
          }),

          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function() {
            console.log('process complete');
          },
          success: function(data) {
            console.log(disciplina);
            console.log('process sucess');
            for(var i = 0; i < data.length; i++) {
              $("#materia").append($("<option />").val(data[i]).text(data[i]));
              console.log(data[i]);
            }
          },

          error: function() {
            console.log('process error');
          },
        });
      });
    });

    //Carrega os campos de respostas e gabarito
    $(function() {
      $("#tipo").change(function(){

        var tipo = $('#tipo').val();
        $("#dadosQuest").empty();

        if (tipo == "Discursiva") {
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

        else if (tipo == "Objetiva") {
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

        $('#dadosQuest').append($('<button type="submit" name="cadastrar" class="btn btn-default btCadQuest">').val("Cadastrar").text("Cadastrar"));

      });
    });
