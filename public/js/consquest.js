 $( function() {
      $("#btn-consultar").click(function(){
        var autor = $('#autor').val();
        var disciplina = $('#disciplina').val();
        var materia = $('#materia').val();
        var creation = $('#creation').val();
        var tipo = $('#tipo').val();
        var nivel = $('#nivel').val();
        var serie = $('#serie').val();

        var table = $('#tabelaUnica').DataTable();    //aqui eu inicializei a tabela.
            table.destroy();              //aqui eu destrui. Pq caso contrario, ficaria repetindo dados toda vez que vc mudasse a materia. ok


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
            $("#Message404").empty();
            var possivelBotao; //Se o user for o autor, o botão de remover é inserido

            for(var i = 0; i < data.length; i++) {
              console.log($("#userMat").val());
              console.log("Antes: "+data[i][3]);
              if(data[i][3] == $("#userMat").val())
              data[i][3] = "<button class='btn btn-danger btn-block' onclick=removerQuest(this) id='botaoRemoverConsQ'>Remover</button>";
              else
              data[i][3] = " ";
              console.log("Depois: "+data[i][3]);

            }

            $("#tabelaUnica").dataTable({ //id da tabela
              "iDisplayLength": 10,            // qtde de resuldados que vao aparecer
              "bLengthChange": false,         // aqui vc pode abilitar se quer que apareca a mais resultados, olha.
              data: data,                     //aqui vc passa os dados da tabela dentro de um array, sla.
              columns: [                    //Aqui vc define as colunas
                  { title: "Código" },
                  { title: "Enunciado" },
                  { title: "Gabarito" },
                  { title: " " }
              ],
              //  "pagingType": "simple_numbers",
              //ABAIXO PODE DEIXAR ASSIM MESMO hehe
               "pagingType": "numbers",
               "language": {
                 "sSearch": "Pesquisar: ",
                 "info": "página _PAGE_ de _PAGES_",
                 "zeroRecords": "Nenhuma questão encontrada",
                  "infoEmpty": "Nenhuma questão encontrada",
                  "infoFiltered": " ",
               },

            });

          },
          error: function() {
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
            $("#materia").append($("<option  selected />").val('Matéria').text('Matéria'));
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
        $("#autor").append($("<option selected />").val('Autor').text('Autor'));
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
        $("#disciplina").append($("<option selected />").val('Disciplina').text('Disciplina'));
        for(var i = 0; i < data.length; i++) {
        //  $('#autor select').append('<option value='+i+'>'+data[i]+'</option>');
          $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
          console.log(data[i]);
        }
      });
    });
