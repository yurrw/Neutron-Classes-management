(function($, window, document) {

  $(function() {                                                              

    var count = 0;                                                                  // QTDE de lembretes
    var notes = $("#notes");                                                        //
    var ctx   = document.getElementById('skills').getContext('2d');                 // Grafico
    var anotacoesLocal = localStorage.getItem("notes");                             // Pega o valor dessa 'Chave'      
    
    /*-------------------------------------------- 
      ajaxCall : FAZ REQUISICAO AJAX PELO POST
          uri  : url que sera chamada
          obj  : dados que serao enviados
          asnc : se será assincrono ou nao
    ----------------------------------------------*/

    function ajaxCall(uri, obj = " ", asnc = true) {
      return $.ajax({                                                               // Retorna o Resultado da funcao ajax
        url: uri,                                                                   // Url que será direcionado 
        type: "POST",                                                               // Tipo de envio
        dataType: "json",                                                           // Tipo de dado que será enviado
        data: JSON.stringify({
          obj
        }), //dados enviados

        contentType: "application/json",                                            // Tipo de dados passados
        cache: false,                                                               // Nega cache ao browser
        timeout: 5000,                                                              // Espera até 5000 mls 
        async: asnc
      });

    }

    /*-------------------------------------------- 
       Salva a nota no : LocalStorage e no DB
    ----------------------------------------------*/

    function svNotes() {

      var anotacoesArray = [];                                                    

      notes.find("li > div").each(function(i, e) {                                 // Procura todas as notas e seus conteudos                           
        var conteudo = $(e).find("textarea.note-content");
        anotacoesArray.push({
          Index: i,
          Conteudo: conteudo.val()
        });
      });

      var jsonParse = JSON.stringify(anotacoesArray);                               // Converte pra Json as 'data' das anotacoes

      localStorage.setItem("notes", jsonParse);                                     // Grava o valor no localStorage: KeyName, KeyValue

      var lembretesConteudo = $(".note-content");                                   
      var anotacoesData = [];                                                       // Guardara o conteudo de todos os lembretes

      lembretesConteudo.each(function(i, e) {                                       // Grava os lembretes no obj anotacoesData

        anotacoesData.push({
          id: i,
          conteudo: $(this).val()
        });
      });

      ajaxCall("/SaveNotes", anotacoesData);                                        // Salva Anotacoes no BD                                     

    }

    /*-------------------------------------------- 
        Gera o padrao de um novo lembrete
          classC  : Cor do lembrete
          content : Conteudo do novo lembrete
          ID      : ID do novo lembrete         
    ----------------------------------------------*/
    function novaNota(classC, content, ID) {

      if (!classC) {                                                                // Checa se uma ClassC foi passada
        classC = "colour" + Math.ceil(Math.random() * 4);                           // Gera uma classe de cor randomicamente 
      }

      
      notes.append( 
                    "<li><div  class='tryteste " + classC + "' >" +                 // Adiciona nova nota para final da lista de notas
                    "<input type='hidden' value=" + ID + " class='idNote'>" +
                    "<textarea class='note-content' />" +
                    "<i class='fa fa-trash-o close-notes' aria-hidden='true'></i>" +
                    "</div></li>"
                  );
      
      var newNote = notes.find("li:last");                                          // linka a nova nota com o ultimo/seu botão de fechar

      newNote.find(".close-notes").click(function() {                               // Fecha a nota      
        ajaxCall('/delNTS', newNote.find("input.idNote").val());                    // Deleta Nota do banco 
        newNote.remove();                                                           // Deleta do localStorage
        svNotes();                                                                  // Salva a nova conjuntura de notas
      });

      cadNovaNota(newNote);                                                         // Chama Funcao de cad/gravar 

      
      if (content) {                                                                // Se um conteúdo for dado, coloca como conteúdo da nova nota
        newNote.find("textarea.note-content").val(content);
      }
        svNotes();                                                                  // Salvar
    }

    /*-------------------------------------------- 
        Salva nota ao bd
          noteElement : ultima nota adicionada
    ----------------------------------------------*/
    function cadNovaNota(noteElement) {
      var div = noteElement.children("div");

      div.hover(function() {
        svNotes();                                                                  // Salva nota
      });

    }

    if (anotacoesLocal) {                                                           // Verifica a existencia de anotacoes no LocalStorage
      var anotacoesArray = JSON.parse(anotacoesLocal);                              // Converte-as para json
      count = anotacoesArray.length;                                                

      for (var y = 0; y < count; y++) {                                             // Cadastra as notas do localStorage /json na tela
        var anotacaoArmazenada = anotacoesArray[y];
        novaNota(anotacaoArmazenada.Colour, anotacaoArmazenada.Conteudo, anotacaoArmazenada.Index);
      }
    }

    $(".new-note").click(function() {                                               // Clicar em nova nota adiciona nota na lista
      var QTDEAnotacoes = 0;                                                        // Responsavel pela qtde de lembretes da pagina

      notes.find("li > div").each(function(i, e) {
        QTDEAnotacoes++;                                                            // Chega no total de lembretes existentes
      });
      if (!(QTDEAnotacoes === 4)) {
        novaNota(null, null, QTDEAnotacoes);                                        // Adiciona nova Nota
      } else alert("Favor deletar uma nota antes de continuar");
    });



  
    if (count === 0) {                                                               // adiciona nota na lista se nçao tiver nenhuma
      novaNota(null, null, 0);
    }




    /*-------------------------------------------- 
      Abaixo são feitas as requisicoes iniciais
        da página index. 
        : Turmas, lembretes, eventos e notas
    ----------------------------------------------*/
    $.when(ajaxCall("/mostraturma"), ajaxCall("/LoadNotes"), ajaxCall("/pesquisaEvento"), ajaxCall("/notas")).done(function(turmas, notes, evts, grades) {
      
      /*PREENCHE O CAMPO DA TURMA */
      var turma = $("#turma");

      turma.append('<div style="display: inline-block;>');                         // Acrescenta div com as turmas dentro da div mae

      for (var i = 0; i < turmas[0].length; i++) {
        turma.append('<div >' + turmas[0][i] + '</div>');
      }

      turma.append('</div>');

      /* PREENCHE OS EVENTOS */
      if (evts[0])                                                                 // Checa se existem eventos gravados
      {
        var evt = $(".eventos");                                                    

        for (var i = evts[0].length - 1; i >= 0; i--) {
          //PEGA A DATA DE INICIO DO EVENTO
          mes        = evts[0][i].startsAt.split('-')[1];                          // Mes do evento 
          dia        = evts[0][i].startsAt.split('-')[2][0] + "" + evts[0][i].startsAt.split('-')[2][1];    // Dia do evento
          dataEvento = " " + dia + "/" + mes + " ";                                // Data Completa do evento

          // Poem no html as seguintes divs
          evt.append('<div class="evento "  onclick="openDesc(' + i + ')" id=' + i + ' ><p><span>' + dataEvento + '</span><b>' + evts[0][i].titulo + '</p></div>');
          $("#" + i + "").append('<div class="descEvt" id="subDesc' + i + '"><p>' + evts[0][i].descricao + '</p></div><br>');
        }
      }

      /*PREENCHE OS LEMBRETES DO PROFESSOR*/
      if (notes[0])                                                                // Checa se foram retornadas anotacoes 
      {     

        if (localStorage.getItem("notes") == null) {                               // Checa se existem itens gravados no localStorage
          for (var i = 0; i < notes[0].length; i++) {                              
            var storedNote = notes[0][i];

            novaNota(null, storedNote[0], i);                                      // Chama Funcao de cadastrar nova nota
          }
        }


      }

      /*CARREGA AS NOTAS DOS ALUNOS*/
      if(grades[0])                                                                // Checa se foram obtidas notas do banco
      {
          var  total   = grades[0].length                                          // Total de notas obtidas do banco
             , arrSete  = []                                                       // Array com notas de 7 acima
             , arrCinco = []                                                       // Arr   com notas entre 5 e 7
             , arrZero  = [];                                                      // Arr   com notas abaixo de 5

          for (var i = 0; i < total; i++) {

            if (grades[0][i] >= 7) 
            {
              arrSete.push([grades[i]]); 

            } else if (grades[0][i] < 7 && grades[0][i] <= 5)
              {
                arrCinco.push([grades[0][i]]);
              } else {
                arrZero.push([grades[0][i]]);
                }

          }
          var seteMedia = parseFloat((arrSete.length * 100) / total);              // Float com notas acima de 7
          var cincoMedia = parseFloat((arrCinco.length * 100) / total);            // Float com notas entre 5 e 7 
          var zeroMedia = parseFloat((arrZero.length * 100) / total);              // Float com notas acima de 0
          var pieData = [{                                                         // Objeto com os dados do grafico
              value: seteMedia,
              label: 'Notas maiores que 7',
              color: '#00a2ff'
            },
            {
              value: cincoMedia,
              label: 'Notas entre 5-7',
              color: '#19cfa2'
            },
            {
              value: zeroMedia,
              label: 'Notas menores que 5',
              color: '#ff3f57'
            }
          ];

          var skillsChart = new Chart(ctx).Pie(pieData);                           // Inicializa o gráfico                 
        
      }
      /*PRÓXIMOS EVENTOS DO PROFESSOR*/

      $(".descEvt").toggle();                                                      //"Esconde" a descricao dos eventos

    });




  });

  //Funções nao onload aqui : 

}(window.jQuery, window, document));