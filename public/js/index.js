(function($, window, document) {



  $(function() { // Quando a página estiver carregada
      var notes, count = 0;
      var xerox        = 0;
      var notes        = $("#notes");


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
                async       : asnc,
              });  

    }
    function svNotes(){
            var lembretesConteudo = $(".note-content");

        var content = [];
        lembretesConteudo.each(function() {   //trocar por map depois
          // var content = ;
            content.push($(this).val());
         });
          ajaxCall("/SaveNotes",content,false);

    };

    $("#btnSave").click(function () {
       // saveNotes();
       alert("salvando");
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
        if(data2[0]){
                 for (var i = 0; i <data2[0].length; i++) {
                    var storedNote = data2[0][i];
                    addNewNote(storedNote[0],storedNote[1]);
             }
        }
        /*PRÓXIMOS EVENTOS DO PROFESSOR*/
        if(evts[0]){
           var datanow = new Date();
           var evt = $("#evento");
           for (var i= evts[0].length -1 ; i>=0; i--){
             //PEGA A DATA DE INICIO DO EVENTO
              mes = evts[0][i].startsAt.split('-')[1];
                    dia = evts[0][i].startsAt.split('-')[2][0]+""+evts[0][i].startsAt.split('-')[2][1];
                    hora= evts[0][i].startsAt.split('-')[2][3]+""+evts[0][i].startsAt.split('-')[2][4];
                    mim = evts[0][i].startsAt.split('-')[2][6]+""+evts[0][i].startsAt.split('-')[2][7];
                    data="("+ dia+"/"+mes+", "+hora+":"+mim+")";
             //PEGA A DATA DE FIM DO EVENTO 
                    mesf = evts[0][i].endsAt.split('-')[1];
                    diaf = evts[0][i].endsAt.split('-')[2][0]+""+evts[0][i].endsAt.split('-')[2][1];
                    horaf= evts[0][i].endsAt.split('-')[2][3]+""+evts[0][i].endsAt.split('-')[2][4];
                    mimf = evts[0][i].endsAt.split('-')[2][6]+""+evts[0][i].endsAt.split('-')[2][7];

                    if (datanow.getUTCMonth()+1 <= mes || datanow.getUTCMonth()+1 <= mesf) 
                       if (datanow.getUTCDate()+1 <= dia || datanow.getUTCDate()+1 <= diaf) {
                          evt.append('<div class="evento" style="background-color:'+evts[0][i].color.secondary+'"><p style="font-size: 10pt;">'+data+'<b>'+evts[0][i].titulo+'</b> - '+evts[0][i].descricao+'</p></div>');
           }
          }
        }

     });

     





    // pega referência da lista de notas

    //clicar em nova nota adiciona nota na lista
    $("#btnNew").click(function () {
        addNewNote();
    });



    // adiciona nota na lista se nçao tiver nenhuma
    if (count === 0) {
        $("#btnNew").click();

    }
    function addNewNote(content,ID) {

      // adiciona nova nota para final da lista de notas
      notes.append("<li><div >" +
          "<input type='hidden' value="+ID+" class='idNote'>"+
          "<textarea class='note-content' placeholder='O que você deve se lembrar?'/>" +
          "<img src='/assets/images/close.png'/>" +
          "</div></li>");
      // linka a nova nota com seu botão de fechar
      var newNote = notes.find("li:last");
      newNote.find("img").click(function () {
            ajaxCall('/delNTS',newNote.find("input.idNote").val());
            newNote.remove();
        //  //saveNotes();
      });

      // hook up event handlers <-- sei lá || pra mostrar/esconder botão de fechar
      addNoteEvent(newNote);

        // se um conteúdo for dado, coloca como conteúdo da nova nota
      if (content) {
        newNote.find("textarea.note-content").val(content);
        }

        // salvar
       // saveNotes();
    }
    function addNoteEvent(noteElement) {
        var div = noteElement.children("div");

    
    }


  });

   // The rest of the code goes here!

}(window.jQuery, window, document));
	
