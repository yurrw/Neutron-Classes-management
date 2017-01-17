(function($, window, document) {


  $(function() { // Quando a página estiver carregada
      var count = 0;
      var xerox        = 0;
      var notes        = $("#notes");

      var anotacoesLocal = localStorage.getItem("notes");

      if(anotacoesLocal){
          var anotacoesArray = JSON.parse(anotacoesLocal);
              count          = anotacoesArray.length;

              for (var y=0; y < count ; y++ ){
                  var anotacaoArmazenada = anotacoesArray[y];
                  addNewNote(anotacaoArmazenada.Colour,anotacaoArmazenada.Conteudo , anotacaoArmazenada.Index);
              }
      }


   /*-------------------------------------------- 
    FAZ REQUISICAO AJAX PELO POST
     Parametro uri  : url que sera chamada
     Parametro obj  : dados que serao enviados
   ----------------------------------------------*/
    function ajaxCall(uri, obj= " ",asnc = true){
        return $.ajax({
                url         : uri,                      //url que será direcionado 
                type        : "POST",                   //tipo de envio
                dataType    : "json",                   //tipo de dado que será enviado
                data        : JSON.stringify({obj}),  //dados enviados
    
                contentType : "application/json", //
                cache       : false,                    //nega cache ao browser
                timeout     : 5000,                     //espera até 5000 mls 
                async       : asnc
              });  

    }
    function svNotes(){

        var anotacoesArray = new Array();

        notes.find("li > div").each(function (i, e){
            var conteudo = $(e).find("textarea.note-content");
            anotacoesArray.push({Index: i, Conteudo: conteudo.val() });
        });

        var jsonParse= JSON.stringify(anotacoesArray);
/*
        console.log("SVNOTES");

        var keys = Object.keys(anotacoesArray);
        var last = keys[keys.length-1];
            console.log(last);
       */ 
       localStorage.setItem("notes", jsonParse);
       
        var lembretesConteudo = $(".note-content");

        var anotacoesData = [];
        lembretesConteudo.each(function(i , e ) {  
          // var content = ;
          // alert($(this).val());
            anotacoesData.push({
                id:i,
                conteudo: $(this).val()
            });
        }
         );

        /*
        var myAssociativeArr = [];
        for (var i=0; i < idArray.length; i++) {
        myAssociativeArr.push({
            id: idArray[i],
            lname: lnameArray[i],
            fname: fnameArray[i]
        });
        }

        */
            console.log(anotacoesData);
         ajaxCall("/SaveNotes",anotacoesData);
      
    }

      // pega referência da lista de notas

      //clicar em nova nota adiciona nota na lista
      $("#btnNew").click(function ()
      {
          var QTDEAnotacoes = 0;
  
          notes.find("li > div").each(function (i, e){
              QTDEAnotacoes++;
          });

          addNewNote(null, null, QTDEAnotacoes);
      });



      // adiciona nota na lista se nçao tiver nenhuma
      if (count === 0) {
          $("#btnNew").click();

      }
      function addNewNote(classC,content,ID) {

            if(!classC){
                classC = "colour" + Math.ceil(Math.random() * 3);
            }

          // adiciona nova nota para final da lista de notas
          notes.append("<li><div  class='"+classC+"' >" +
              "<input type='hidden' value="+ID+" class='idNote'>"+
              "<textarea class='note-content' />" +
              "<i class='fa fa-trash-o close-notes' aria-hidden='true'></i>"+
              "</div></li>");
          // linka a nova nota com seu botão de fechar
          var newNote = notes.find("li:last");

          newNote.find("i").click(function () {
             // ajaxCall('/delNTS',newNote.find("input.idNote").val());



              /*

                    var anotacoesLocal = localStorage.getItem("notes");

               if(anotacoesLocal){
               var anotacoesArray = JSON.parse(anotacoesLocal);
               count          = anotacoesArray.length;

               for (var y=0; y < count ; y++ ){
               var anotacaoArmazenada = anotacoesArray[y];
               addNewNote(anotacaoArmazenada.Colour,anotacaoArmazenada.Conteudo , y);
               }
              * */
              // console.log(newNote)
              console.log(newNote.find("input.idNote").val());



              newNote.remove();
              svNotes();
          });

          // hook up event handlers <-- sei lá || pra mostrar/esconder botão de fechar
          addNoteEvent(newNote);

          // se um conteúdo for dado, coloca como conteúdo da nova nota
          if (content) {
              newNote.find("textarea.note-content").val(content);
          }

          // salvar
           svNotes();
      }
      function addNoteEvent(noteElement) {
          var div = noteElement.children("div");
          var closeImg = div.find("i");

          div.focus(function () {
              closeImg.removeClass("hide");
          });

          div.children().focus(function () {
              closeImg.removeClass("hide");
          });

          div.hover(function () {
              closeImg.removeClass("hide");
          }, function () {
              closeImg.addClass("hide");
              svNotes();
          });

          div.children().hover(function () {
              closeImg.removeClass("hide");
          }, function () {
              closeImg.addClass("hide");
          });
      }



      $("#btnSave").click(function () {
       // saveNotes();
       svNotes();
    });

             //O CODIGO SEGUINTE FAZ AS REQUISIÇÕES INICIAIS DA PÁGINA. AS QUAIS SOLICITARÃO, AS TURMAS DO PROFESSOR, SEUS LEMBRETES, E OS PROXIMOS EVENTOS.
     $.when(ajaxCall("/mostraturma"), ajaxCall("/LoadNotes"), ajaxCall("/pesquisaEvento")).done(function( data,data2,evts ){

        var turma  = $("#turma");
        /*PREENCHE O CAMPO DA TURMA */
        turma.append('<div style="display: inline-block;>');      
        for (var i = 0 ; i <data[0].length; i++) {  
                turma.append('<div ><a href="#">'+data[0][i]+'</a></div>');            
               }
        turma.append('</div>');

            /*PREENCHE OS LEMBRETES DO PROFESSOR*/
      /*  if(data2[0]){
                 for (var i = 0; i <data2[0].length; i++) {
                    var storedNote = data2[0][i];
                    addNewNote(storedNote[0],storedNote[1]);
             }
        }*/
        /*PRÓXIMOS EVENTOS DO PROFESSOR*/
        if(evts[0]){
           var evt = $(".eventos");
           for (var i= evts[0].length -1 ; i>=0; i--){
             //PEGA A DATA DE INICIO DO EVENTO
              mes = evts[0][i].startsAt.split('-')[1];
              dia = evts[0][i].startsAt.split('-')[2][0]+""+evts[0][i].startsAt.split('-')[2][1];
              data=" "+ dia+"/"+mes+" ";
                          //</b> - '+evts[0][i].descricao+'
                          evt.append('<div class="evento "  onclick="openDesc('+i+')" id='+i+' ><p><span>'+data+'</span><b>'+evts[0][i].titulo+'</p></div>');
               $("#"+i+"").append('<div class="descEvt" id="subDesc'+i+'"><p>'+evts[0][i].descricao+'</p></div><br>');
          }
        }
         $(".descEvt").toggle();

     });

          // $("#0","#1","#2","#3","#4").click(function(){
          //     alert('ola');
          // });







  });

   // The rest of the code goes here!

}(window.jQuery, window, document));
	
