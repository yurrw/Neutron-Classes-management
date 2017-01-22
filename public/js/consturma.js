
    $(function(){
      $('#textAreas').hide();
      $('#btAreas').hide();
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
                .append($("<td />").val(i+1).text(i+1))
                .append($("<td />").val(data[i][1]).text(data[i][1]))
                .append($("<td />").val(data[i][0]).text(data[i][0]))
                .append($("<td />").val(data[i][2]).text(data[i][2]))
                .append("<input type='checkbox' id='chk' name='chk'  /> ")
                .append($("<td  />")
                  ));
              console.log(data[i]);
            }
            console.log('process sucess');
          },
          error: function() { console.log('process error');},
        });
      });
    });

    $(document).on('change', '[type=checkbox]',function(e){
      var umaChecked = $('input[name="chk"]:checked').length > 0;
      if (umaChecked){ //NAO TA CERTO MASSSSSSSSSS FUNCIONA
        $('#textAreas').show();
        $('#btAreas').show();
      }
      else{
        $('#textAreas').hide();
        $('#btAreas').hide();
      }
    });