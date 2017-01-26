 $( function() {
  $( "#datepicker" ).datepicker({
       yearRange: '1900:2050',
       changeMonth: true,
       changeYear: true,
       altFormat: "yy-dd-mm",
       altField: "#alt-date"
  });
  } );



  $( function() {

  $("#div2").hide();

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
      // console.log(disciplina);
      console.log('process sucess');
      $("#disciplina").empty();
  $("#disciplina").append($("<option disabled selected />").val('Disciplina').text('Disciplina'));
      for(var i = 0; i < data.length; i++) {
        $("#disciplina").append($("<option />").val(data[i]).text(data[i]));
      //  alert(data[i]);
      }

    },

    error: function() {
      console.log('process error');
    },
  });


    $("#disciplina").change(function(){
      var disciplina = $('#disciplina').val();
  $("#materia").empty();
  $("#materia").append($("<option disabled selected />").val('Matéria').text('Matéria'));

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
          $("#questCandidatas").empty();
          $("#questSelecionadas").empty();

          for(var i = 0; i < data.length; i++) {
            $("#materia").append($("<option />").val(data[i]).text(data[i]));
          //  alert(data[i]);
          }
        },

        error: function() {
          console.log('process error');
        },
      });
    });
  });


  $( function() {
    $("#materia").change(function(){
      var materia = $('#materia').val();
      var table = $('#tableCandidatas').DataTable();
          table.destroy();
      $.ajax({
        url: "/pesqQuest",  // AQUI É A URL QUE SERA ENVIADO
        type: "POST",   //TIPO DE ENVIO
        dataType: "json", //TIPO DE DADO QUE SERA PASSADO
        data:JSON.stringify({
          materia: materia,
        }),

        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        success: function(data) {
          console.log(materia);
          console.log('process sucess');
          $("#questCandidatas").empty();
          var dificuldade;
          // <input class="star star_1" id="star_1" type="radio" name="star" value="Fácil" required/>
          // <label class="star star_1" for="star_1" id="label1"></label>



         for(var i = 0; i < data.length; i++) {

           if (data[i][1] == "Fácil") {
             dificuldade = 'Facil';
           }
           else if (data[i][1] == "Mediana" || data[i][1] == "Média") {
             dificuldade =  'Mediana';
           }
           else if (data[i][1] == "Difícil") {
             dificuldade = 'Difícil';
           }
           data[i][3] = "<button class='btn btn-primary btn-block btn-pass' onclick='trocarTabela(this)'> Adicionar </button>";
/*
           $("#questCandidatas").append($("<tr/>")
           .append($("<td/>").val(data[i][0]).text(data[i][0]))
           .append($("<td style='text-align:center;'/>").val(data[i][2]).text(data[i][2]))
           .append($("<td style='text-align:center;' />").append(dificuldade +"</div>"))
           .append($("<td  style='align:right; width:100px;'/>")
           .append($("<button class='btn btn-primary btn-block' onclick='trocarTabela(this)'>").text("Adicionar"))
         ));
          console.log(data[i]);

*/

         }
         
          $("#tableCandidatas").dataTable({
            "iDisplayLength": 5,
            "bLengthChange": false,
            data: data,
            columns: [
                { title: "Enunciado" },
                { title: "Dificuldade" },
                { title: "Tipo" },
                { title: " " }
            ],
            //  "pagingType": "simple_numbers",
             "pagingType": "numbers",
             "language": {
               "sSearch": "Pesquisar: ",
               "info": "página _PAGE_ de _PAGES_",
               "zeroRecords": "Nenhuma questão encontrada",
                "infoEmpty": "Nenhuma questão encontrada",
                "infoFiltered": " ",
                 "oPaginate": {
                  "sPrevious": "<",
                  "sNext": ">",
                 }
             },

          });

          /*
          $(document).ready(function() {
    var t = $('#example').DataTable();
    var counter = 1;
 
    $('#addRow').on( 'click', function () {
        t.row.add( [
            counter +'.1',
            counter +'.2',
            counter +'.3',
            counter +'.4',
            counter +'.5'
        ] ).draw( false );
 
        counter++;
    } );
 
    // Automatically add a first row of data
    $('#addRow').click();
} );
          
          */


        },

        error: function() {
          console.log('process error');
        },
      });

  


   
    });
  });






$(function(){
  $("#cadastrar").click(function(){
      var nomeP = $("#nomeP").val();
      var disciplina = $("#disciplina").val();
      var serie = $("#serie").val();
      var tipo = $("#tipo").val();
      var materia = $("#materia").val();

    if($('#tableSelecionadas tr').length > 1 && materia && nomeP && disciplina && serie && tipo){
      var dados = [];
       var table = document.getElementById('tableSelecionadas');

    for(var r = 1; r < table.rows.length; r++)
      dados[r] = table.rows[r].cells[1].innerHTML;

    $.ajax({
          url: "/cadastroProva",  // AQUI É A URL QUE SERA ENVIADO
          type: "POST",   //TIPO DE ENVIO
          dataType: "json", //TIPO DE DADO QUE SERA PASSADO
          data:JSON.stringify({
              dados : dados,
              nomeP : nomeP,
              disciplina : disciplina,
              serie : serie,
              tipo : tipo
          }),

          contentType: "application/json",
          cache: false,
          timeout: 5000,
          complete: function() {
            console.log('process complete');
            location.reload();
          },
          success: function(data) {
            console.log('process sucess');
          },

          error: function() {
            console.log('process error');
          },
        });

        

    }else {
      alert("Por favor, preencha todos os campos ");

    }
        
   
  });
});
