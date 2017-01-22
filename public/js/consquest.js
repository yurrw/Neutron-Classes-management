 $( function() {
      $("#btn-consultar").click(function(){
        var autor = $('#autor').val();
        var disciplina = $('#disciplina').val();
        var materia = $('#materia').val();
        var creation = $('#creation').val();
        var tipo = $('#tipo').val();
        var nivel = $('#nivel').val();
        var serie = $('#serie').val();

        $.ajax({
          url: "/pescaconsul",
          type: "POST",
          dataType: "json",
          data:JSON.stringify({
              autor: autor,
              disciplina : disciplina,
              materia : materia,
              creation : creation,
              nivel : nivel,
              tipo: tipo,
              serie: serie
          }),
          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function(){
            console.log('process complete : /pescaconsul');
          },
          success: function(data) {
            console.log(data);
            console.log('process sucess');
            $("#tableQuestoes").empty();
            $("#errorMessage").empty();
            var possivelBotao; //Se o user for o autor, o botão de remover é inserido

            for(var i = 0; i < data.length; i++) {
              if(data[i][3] == "<%= userMat %>")
              possivelBotao = "<button class='btn btn-danger btn-block' onclick=removerQuest(this)>";
              else
              possivelBotao = "";

              $("#tableQuestoes").append($("<tr/>")
              .append($("<td/>").val(data[i][2]).text(data[i][2]))
              .append($("<td/>").val(data[i][0]).text(data[i][0]))
              .append($("<td/>").val(data[i][1]).text(data[i][1]))
              .append($("<td width='10px'/>")
              .append($(possivelBotao).val("Remover").text("Remover"))));
              console.log(data[i]);
            }
          },
          error: function() {
            console.log('Bundaaaaaaaaaaa');
            $("#tableQuestoes").empty();
            $("#Message404").empty();
            $("#Message404").append($("<div class='alert alert-danger' style='text-align: center;margin-left:50px;'>").text("Não há questões compatíveis com a consulta"));
          },
        });
      });
    });


    //Pesquisa as matérias da disciplina selecionada
    $( function() {
      $("#disciplina").change(function(){
        var disciplina = $('#disciplina').val();
        console.log(disciplina);
        $.ajax({
          url: "/pesqMat",
          type: "POST",
          dataType: "json",
          data:JSON.stringify({
            disciplina: disciplina
          }),
          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function(){console.log('process complete /pesqMat');},
          success: function(data) {
            console.log(disciplina);
            console.log('process sucess');
            $("#materia").empty();
            $("#materia").append($("<option disabled selected />").val('Matéria').text('Matéria'));
            for(var i = 0; i < data.length; i++) {
              $("#materia").append($("<option />").val(data[i]).text(data[i]));
              console.log(data[i]);
            }
          },
          error: function() { console.log('process error');},
        });
      });
    });


    //Função para remover a questão da tabela
    function removerRow(btn) {
      x--;
      var row = btn.parentNode.parentNode;
      row.parentNode.removeChild(row);
      novaRow[x] = "";
    }

    //Remove a questão do banco
    function removerQuest(element){
      var table = document.getElementById('tabelaUnica');
      var r = parseInt(element.parentNode.parentNode.rowIndex);
      var codigo = table.rows[r].cells[0].innerHTML;
      alert(codigo);
      $.ajax({
        url: "/deletarQuest",
        type: "POST",
        dataType: "json",
        data:JSON.stringify({
          codigo_quest: codigo
        }),
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {console.log('process complete');},
        success: function(data) {
          var row = element.parentNode.parentNode;
          row.parentNode.removeChild(row);
        },
        error: function() {
          console.log('process error');
        },
      });
    };

    //Pesquisa os professores ao carregar a página
    $(function pesqProfs(){
      $.post("/pesqProfs",function(data){
        $("#autor").empty();
        $("#autor").append($("<option selected disabled/>").val('Autor').text('Autor'));
        for(var i = 1; i < data.length; i++) {
          $("#autor").append($("<option />").val(data[i]).text(data[i]));
          console.log(data[i]);
        }
      });
    });

    //Pesquisa as disciplinas ao carregar a página
    $(function pesqDisciplina(){
      $.post("/pesqDisc",function(data){
        $("#disciplina").empty();
        $("#disciplina").append($("<option selected disabled/>").val('Disciplina').text('Disciplina'));
        for(var i = 0; i < data.length; i++) {
        //  $('#autor select').append('<option value='+i+'>'+data[i]+'</option>');
          $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
          console.log(data[i]);
        }
      });
    });