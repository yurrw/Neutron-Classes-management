
   $(function() {

    //   $(".time_element").timepicki();
      	$('#horaStart').timepicki({
		show_meridian:false,
        custom_classes:"correctTimer",
		min_hour_value:7,
		max_hour_value:18,
		step_size_minutes:15,
		overflow_minutes:true,
		increase_direction:'up',
		disable_keyboard_mobile: true,
        start_time: ["07", "000", "AM"],
        });

    $('#initAula').hide();                                  //mantém alguns elementos escondidos até que a consulta seja efetuada
      $("#disc").hide();
      $("#data").hide();
      $("#dadoos").hide();
       $('#txtSelectedDate').val($.datepicker.formatDate('dd/mm/yy', new Date()));


               $.ajax({                                                             //função que carrega as turmas para serem selecionadas
                   url: "/mostraturma", // AQUI É A URL QUE SERA ENVIADO
                   type: "POST", //TIPO DE ENVIO
                   dataType: "json", //TIPO DE DADO QUE SERA PASSADO
                   contentType: "application/json",
                   cache: false,
                   timeout: 5000,
                   complete: function() {
                       //called when complete
                   },

                   success: function(data) {
                       var ginea = data +" ";
                       var spt = ginea.split(",");
                        for(var x=0; x< spt.length; x++){
                          $("#numturma").append('<option value='+spt[x]+'>'+spt[x]+'</option> ');           //divide a array que tem o nome das turmas
                        }
                       var name = [];
                       name = data;
                       //document.getElementById("btn-mostraturma").innerHTML = name.toString();
                      // nometurma
                       console.log('process sucess');
                   },

                   error: function() {
                       console.log('process error');
                   },
               });

               $("#txtSelectedDate").datepicker({
                   yearRange: '1900:2050',
                   changeMonth: true,
                   changeYear: true,
                   altFormat: "dd/mm/yy",
                   dateFormat: "dd/mm/yy",
                   altField: "#alt-date"
               });
               $("#consultaDiarioTurma").click(function(){                                  //consulta aula no diário
                $("#data").show();
                $("#dadoos").show();
                brotheragem();

               });

               $("#numturma").change(function() {                                         //função que será executada quando o nome da turma for alterado
                   $('#initAula').show();
      $("#disc").show();

                    $('#nomedisciplina').empty();
                   $.ajax({

                           url: "/pesqDiscProf",                                          //Pesquisa a disciplina com base no PROFESSOR
                           type: "POST", //TIPO DE ENVIO
                           dataType: "json", //TIPO DE DADO QUE SERA PASSADO
                           contentType: "application/json",
                           cache: false,
                           timeout: 5000,
                           complete: function() {
                               //called when complete
                               console.log('process complete');
                           },

                           success: function(data) {
                               console.log(data);
                               var opcoes = [];
                               opcoes = data;



                          var mySelect = $('#nomedisciplina');
                          $.each(opcoes, function(val, text) {
                              mySelect.append(
                                  $('<option></option>').html(text)
                              );
                          });



                               console.log('process sucess');


                           },

                           error: function() {
                               console.log('process error');
                           },
                       });
                 });


var brotheragem = function() {
    var nometurma = $('#numturma').val();
    var data = $('#txtSelectedDate').val();
    var hora = $('#horaStart').val();
  var disc = $('#nomedisciplina').val();


    $.ajax({                                                                    //função para pegar a aula com base no dia selecionado
        url: "/pegaaula", // AQUI É A URL QUE SERA ENVIADO
        type: "POST", //TIPO DE ENVIO
        dataType: "json", //TIPO DE DADO QUE SERA PASSADO
        data: JSON.stringify({
            txtSelectedDate: data,
            disciplina: disc,
            nometurma: nometurma,
            initHour : hora
        }),
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
            console.log('process complete');
        },

        success: function(data) {




            console.log('process sucess');
            $("#tablebody").empty();
            var tamanho = data.length;
            var txt = "";
            for (var i = 0; i < data.length; i++) {
                if (!(i == data.length - 1)) {
                    if (data[i][2] == "true") {                                                     //Entra aqui caso a presença seja verdadeira

                        $("#tablebody").append($("<tr>")                                            //preenche a tabela com os elementos da busca
                            .append($("<td />").val(i + 1).text(i + 1))

                            .append($("<td/>").val(data[i][1]).text(data[i][1]))
                            .append($("<td style='text-align:center;'/>").val(data[i][0]).text(data[i][0]))
                            .append($("<td  style='text-align:center;' > ")
                            .append($(" <input type='checkbox' class='chkPresenca' id='chk' name='chk' value='true' /> ").prop('checked', true))
                            .append($("</td>")))
                            ).append($("</tr>"));
                    } else {                                                                        //Entra aqui caso a presença seja falsa
                        $("#tablebody").append($("<tr>")
                            .append($("<td />").val(i + 1).text(i + 1))

                            .append($("<td/>").val(data[i][1]).text(data[i][1]))
                            .append($("<td style='text-align:center;'/>").val(data[i][0]).text(data[i][0]))
                              .append($("<td  style='text-align:center;'>")
                            .append($("<input type='checkbox'  class='chkPresenca' id='chk' name='chk' value='true' /> ").prop('checked', false))
                              .append($("</td>")))
                            ).append($("</tr>"));


                    }
                } else {
                    $('#textAreas').val(data[i][0]);                                    //preenche o espaço para o comentário
                }




                //$('#textAreas').val(data[tamanho])
            }


        },

        error: function() {

            $('#textAreas').val("");


            console.log('process error');
        },
    });



}


                      $("#btDiaAnterior").click(function() {                          //função executada quando o botão de voltar um dia receber um click


                   var data = $("#txtSelectedDate").datepicker("getDate");
                   $("#txtSelectedDate").datepicker("setDate", new Date(data.getFullYear(), data.getMonth(), data.getDate() - 1));    //volta um dia

           brotheragem();

               });
               $("#btDiaPosterior").click(function() {                              //função executada quando o botão de avançar um dia receber um click
                   var data = $("#txtSelectedDate").datepicker("getDate");
                   $("#txtSelectedDate").datepicker("setDate", new Date(data.getFullYear(), data.getMonth(), data.getDate() + 1));   //avança um dia
           brotheragem();

               });


              $("#btAreas").click(function() {                                    //função executada quando o botão de gravar receber um click
                  var nometurma = $('#numturma').val();                           //                                                         //
                  var data = $('#txtSelectedDate').val();                         //                                                         //
                  var coment = $('#textAreas').val();                             //PEGA VALORES PARA GRAVAR NO BD                           //
                  var hora = $('#horaStart').val();                               //                                                         //
                  var nomedisciplina = $('#nomedisciplina').val();                //__________________________________________________________





                  var table = document.getElementById('tabletop');                //pega conteúdo da tabletop e joga na variável table

                  var checks = [];                                                //array que receberá o valor dos checks de presença
                  $('input[type=checkbox]').each(function() {
                      //if(this.checked){
                      checks.push(this.checked);

                      //   }

                  });




                  var tabela = [];




                  for (var r = 1, i = 0; r < table.rows.length; r++, i++) {         //Variável que receberá as linhas da table
                      tabela[i] = table.rows[r].cells[1].innerHTML;


                  }


                  // console.log(table);


                  $.ajax({                                                          //função que fará o cadastro das informações do diário
                      url: "/cadastroDiario", // AQUI É A URL QUE SERA ENVIADO
                      type: "POST", //TIPO DE ENVIO
                      dataType: "json", //TIPO DE DADO QUE SERA PASSADO
                      data: JSON.stringify({
                          chk: chk,

                          txtSelectedDate  : data,                                      //___________________________________________//
                          nomedisciplina   : nomedisciplina,                            //                                           //
                          textAreas        : coment,                                    //                                           //
                          turma            : nometurma,                                 //VARIÁVEIS QUE SERÃO GRAVADAS NO BANCO      //
                          matriculas       : tabela,                                    //                                           //
                          chks             : checks,                                    //                                           //
                          comentario       : coment,                                    //                                           //
                          initHour         : hora                                       //___________________________________________//

                      }),
                      contentType: "application/json",
                      cache: false,
                      timeout: 5000,
                      complete: function() {
                          console.log('process complete');
                      },

                      success: function(data) {


                          console.log('process sucess');
                      },

                      error: function() {
                          console.log('process error');
                      },
                  });



              });



   });
