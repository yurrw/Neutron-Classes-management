
    $(function(){
      $('#textCont').hide();
      $('#textAreas').hide();
      $('#btAreas').hide();
      $('#contact').hide();

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
      $("#btn-consultar").click(function(){
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
                .append($("<td class='' style='width:75%'/>").val(data[i][0]).text(data[i][0]))
                // .append($("<td />").val(data[i][2]).text(data[i][2]))
              );
              console.log(data[i]);
              $("#contact").show();
            }
            console.log('process sucess');
          },
          error: function() { console.log('process error');},
        });
      });
    });

    $(document).on('click', '#contact', function(){
      if($("#textCont").is(":hidden")){
        $('#contact').text("Não contatar");
        $('#textCont').show();
        $('#textAreas').show();
        $('#btAreas').show();
      }
      else {
        $('#contact').text("Contatar turma");
        $('#textCont').hide();
        $('#textAreas').hide();
        $('#btAreas').hide();
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
