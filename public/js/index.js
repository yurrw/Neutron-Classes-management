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
         ajaxCall("/SaveNotes",anotacoesData);
      
    }

      // pega referência da lista de notas

      //clicar em nova nota adiciona nota na lista
      // $(".new-note").click(function ()
      $(".new-note").click(function ()
      {
          var QTDEAnotacoes = 0;
  
          notes.find("li > div").each(function (i, e){
              QTDEAnotacoes++;
          });
          if (!(QTDEAnotacoes ===4)){
            addNewNote(null, null, QTDEAnotacoes);
          }else alert("Favor deletar uma nota antes de continuar");
      });



      // adiciona nota na lista se nçao tiver nenhuma
      if (count === 0) {
        addNewNote(null, null, 0);
      }

      function addNewNote(classC,content,ID) {

            if(!classC){
                classC = "colour" + Math.ceil(Math.random() * 4);
            }

          // adiciona nova nota para final da lista de notas
          notes.append("<li><div  class='tryteste "+classC+"' >" +
              "<input type='hidden' value="+ID+" class='idNote'>"+
              "<textarea class='note-content' />" +
              "<i class='fa fa-trash-o close-notes' aria-hidden='true'></i>"+
              "</div></li>");
          // linka a nova nota com seu botão de fechar
          var newNote = notes.find("li:last");

          newNote.find(".close-notes").click(function () {
              ajaxCall('/delNTS',newNote.find("input.idNote").val());
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

          div.hover(function () {
              svNotes();
          });

      }



        /*      
        if(localStorage.getItem("notes") === null)
        {
          alert('oi');
        }else{
          alert('Ola');
        }
        */

             //O CODIGO SEGUINTE FAZ AS REQUISIÇÕES INICIAIS DA PÁGINA. AS QUAIS SOLICITARÃO, AS TURMAS DO PROFESSOR, SEUS LEMBRETES, E OS PROXIMOS EVENTOS.
     $.when(ajaxCall("/mostraturma"), ajaxCall("/LoadNotes"), ajaxCall("/pesquisaEvento")).done(function( data,data2,evts ){

        var turma  = $("#turma");
        /*PREENCHE O CAMPO DA TURMA */
        turma.append('<div style="display: inline-block;>');      
        for (var i = 0 ; i <data[0].length; i++) {  
                turma.append('<div >'+data[0][i]+'</div>');            
               }
        turma.append('</div>');

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
            /*PREENCHE OS LEMBRETES DO PROFESSOR*/
        if(data2[0]){

                if(localStorage.getItem("notes") == null)
                  {
                                   for (var i = 0; i <data2[0].length; i++) {
                           var storedNote = data2[0][i];
                         console.log(storedNote);
                        addNewNote(null, storedNote[0], i);
                     }
                  }


        }
        /*PRÓXIMOS EVENTOS DO PROFESSOR*/

         $(".descEvt").toggle();

     });

          // $("#0","#1","#2","#3","#4").click(function(){
          //     alert('ola');
          // });







  });

   // The rest of the code goes here!

}(window.jQuery, window, document));
	
