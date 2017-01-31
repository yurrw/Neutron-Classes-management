

$( function() {





});








// $("#cadnota").click(function() {
// var nometurma = $('#nometurma').val();
//        var trimestre= $('#textAreas').val();
//
//       var nomedisciplina= $('#nomedisciplina').val();
//
// //      var i = 1;
//
// //      $('input[type=checkbox]').each(function() {
//
//
//
//
// //          if (this.checked) {
//
// //              //   console.log("value='"+i+"'");
// //              $("#chkHidden[alt='" + i + "']").prop('disabled', true);
// //              console.log('desabilitou ');
// //          } else {
// //              //   document.getElementById("chkHidden").disabled=false;
// //              // console.log('false');
//
// //          }
// //          i++;
//
//
// //      });
//
//
//
// var table = document.getElementById('tabletop');
//
// var checks =[];
//     $('input[type=checkbox]').each(function(){
//             //if(this.checked){
//                   checks.push(this.checked);
//
//          //   }
//
//     });
//
//
//
//
//         var tabela = [];
//
//
//
//
// for(var r = 1, i =0 ; r < table.rows.length; r++,i++){
//   tabela[i] = table.rows[r].cells[1].innerHTML;
//
//
// }
//
//
//  // console.log(table);
//
//
//      $.ajax({
//          url: "/cadastroDiario", // AQUI É A URL QUE SERA ENVIADO
//          type: "POST", //TIPO DE ENVIO
//          dataType: "json", //TIPO DE DADO QUE SERA PASSADO
//          data: JSON.stringify({
//           chk:chk,
//
//              txtSelectedDate:data,
//              nomedisciplina:nomedisciplina,
//              textAreas:coment,
//              turma: nometurma,
//              matriculas:tabela,
//              chks:checks,
//           comentario:coment
//
//          }),
//          contentType: "application/json",
//          cache: false,
//          timeout: 5000,
//          complete: function() {
//              console.log('process complete');
//          },
//
//          success: function(data) {
//
//
//              console.log('process sucess');
//          },
//
//          error: function() {
//              console.log('process error');
//          },
//      });
//
//
//
//  });







    $(function(){
      $('#cadnota').hide();
      $('#tri').hide();
      $('#disciplina').hide();

      $.ajax({
        url: "/mostraturma",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {},
        success: function(data) {
          for (var i = 0 ; i < data.length; i++) {$('#nometurma').append("<option>"+data[i].toString()+"</option>");}
        },
        error: function() {console.log('process error mostraturma');},
      });
      $("#MsgconsTurma").hide();




      $("#cadnota").click(function(){

        var testenotas = [];
        var provanotas = [];

        $($('#tabelaAlunos').find('input.teste')).each(function()
        {
            testenotas.push($(this).val());

        });
        console.log(testenotas);

        // $('#tabelaAlunos').each(function()
        $($('#tabelaAlunos').find('input.prova')).each(function()
        {
           provanotas.push($(this).val());


        });
        console.log("---------");
        console.log(provanotas);
        var matriculasAlunosNotas= [];
                var table = document.getElementById('tabelaAlunos');
        // var row = parseInt(element.parentNode.parentNode.rowIndex);

        for(var i=1; i<table.rows.length; i++)
        {
          console.log(table.rows[i].cells[1].innerHTML);
          matriculasAlunosNotas.push(table.rows[i].cells[1].innerHTML)
        }
        //ESSE ALERT EXIBE A OPCAO SELECIONADA.
        alert($("#tri").val());
        alert($("#disciplina").val());
        var testenotasINT = parseInt(testenotas);
        var provanotasINT = parseInt(provanotas);
        for (var i = 0, len = provanotas.length; i < len; i++) {
          alert(provanotasINT[i]);
        }

        $.ajax({
              url: "/cadnotas",  // AQUI É A URL QUE SERA ENVIADO
              type: "POST",   //TIPO DE ENVIO
              dataType: "json", //TIPO DE DADO QUE SERA PASSADO
              data:JSON.stringify({
                  somanotas : go,
                  matAlunos : matriculasAlunosNotas,
                  notaProva : provanotas,
                  notaTeste : testenotas,
                  tri       : $("#tri").val(),
                  disciplina: $("#disciplina").val()

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





      //   var table = document.getElementById('tabelaAlunos');
      //
      // for(var r = 1; r < table.rows.length; r++)
      // {
      //   testenotas[r] = table.rows[r].cells[3].innerHTML;
      //   provanotas[r] = table.rows[r].cells[4].innerHTML;
      // }






        // var table = document.getElementById('tabelaAlunos');
        //
        //  var notas =[];
        //      $('input[type=textbox]').each(function(){
        //              //if(this.checked){
        //                    checks.push(this.checked);
        //
        //           //   }

             });


      });





    $( function(){
      $("#btn-consultarnota").click(function(){
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
            $("#IzaMyLuv").empty();
            for(var i = 0; i < data.length; i++) {
              $("#IzaMyLuv").append($("<tr/>")
                .append($("<td class='cellMeio' style='width:5%'/>").val(i+1).text(i+1))
                .append($("<td class='cellMeio' style='width:20%'/>").val(data[i][1]).text(data[i][1]))
                .append($("<td class='' style='width:15%'/>").val(data[i][0]).text(data[i][0]))
                .append($("<td class='' style='width:25%; text-align:center;'/>").append($("<input type='text' style='text-align:center;' class='form-control teste' id='txtt' name='txtt' size='1'/> ")))
                .append($("<td class='' style='width:25%; text-align:center;'/>").append($("<input type='text' style='text-align:center;' class='form-control prova' id='txtp' name='txtp' size='1'/> ")))

                // .append($("<td />").val(data[i][2]).text(data[i][2]))
              );
              console.log(data[i]);
              $("#cadnota").show();
              $("#tri").show();
              $('#disciplina').show();
            }
            console.log('process sucess');


          },
          error: function() { console.log('process error');},
        });
    $.ajax({
      url: "/pesqDiscProfIII",  // AQUI É A URL QUE SERA ENVIADO
      type: "POST",   //TIPO DE ENVIO
      dataType: "json", //TIPO DE DADO QUE SERA PASSADO
      data: JSON.stringify({

          nometurma   : nometurma,

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
        $("#disciplina").empty();
        $("#disciplina").append($("<option disabled selected />").val('Disciplina').text('Disciplina'));
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
