/***********************************************
o codigo a baixo é para controle e experiencia da pagina e inserção de eventos.
************************************************/

$(document).ready(function(){
      $("#addEvento").hide();                                                                     //esconde o formulario de inserção
      $("#editEvento").hide();                                                                    //esconde o formulario de edição evento

      $("#btEvento").click(function() {                                                           // função esconde ou exibea div addEvento pelo btn
        if($('#addEvento:visible').length) { $('#addEvento').hide(100);}                          // condicional esconde caso esteja visivel
        else { $('#addEvento').show(100);}                                                        // condicional exibe caso esteja invisivel
      });

      $(document).mouseup(function (e) {                                                          //esconde a div addEventopela pela ação do mouse
        var div = $("#addEvento");
        if (!div.is(e.target) && div.has(e.target).length === 0) { div.hide(50);}                 //caso o mouse click fora da div ela se esconde
      });

      $(document).mouseup(function (e) {                                                          //esconde a div editEvento pela ação do mouse
        var div = $("#editEvento");
        if (!div.is(e.target) && div.has(e.target).length === 0) { div.hide(50);}                 //caso o mouse click fora da div ela se esconde
      });

      /********************************

      ********************************/
      $("#addEventoTurmaS").hide();
      $("#addEventoTurmaCb:checkbox").change(function ()
      {
        if(this.checked) {$('#addEventoTurmaS').show(150);}
        else{ $('#addEventoTurmaS').hide(150);
          //$('#nometurma').empty();
         // $('#nometurma').val("").change();
        }

      });


      /*--------------------------------------------
            ajax : FAZ REQUISICAO AJAX PELO POST
            uri  : url que sera chamada
      ----------------------------------------------*/
      $.ajax({
            url: "/mostraturma",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function() {},
            success: function(data) {
              $("#nometurma").empty();                                                                                  //deleta a lista de turmas se ouver
              $("#nometurma").append($("<option selected='selected'/>").val('').text('Sem turma'));                     //Acrescenta a consulta com alista de turmas
              for(var i = 0; i < data.length; i++) { $("#nometurma").append($("<option />").val(data[i]).text(data[i]));}
            },
            error: function() { console.log('process error : mostraturma ');},
      });

        $("#fecharEditarEvntos").click(function(){$("#editEvento").hide(150);});                                        //esconde a div de adicionar evento
      });


/***************************************************************************

 o codigo a baixo é para controlar o API do calendario.
 Essa API é baseada em angularJS.

****************************************************************************/
angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap']);                                   //módulos de iniciação da API
angular
.module('mwl.calendar.docs')                                                                                          //model da API
.controller('sgeCtrl', function(moment, calendarConfig,$scope, $http,$window) {                                       //controller em que sera esbelecido a exibição do calendario
  /***********************************************************
  configurando o calendario e definindo acoes
  ************************************************************/

  var vm = this;                                                                                                      //objeto padrão da API na qual passamos os paramentros e informações

  vm.calendarView = 'month';                                                                                          //mode de visualição: mes
  vm.viewDate = new Date();                                                                                           // define a data atual no caledario
  vm.events = [];                                                                                                     //objeto onde estara os eventos

  var actions = [                                                                                                     //lista de acoes disponiveis no calendario
    {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',                                                          //exibe um icone no calendario: "x"
      onClick: function(args) {                                                                                       //o evento acontecera quando acontecer o click no icone
        vm.editar = args.calendarEvent;                                                                               //atribui o evento ao objeto responsavel por deletar o evento
        vm.editar.op = "Deletar";                                                                                     //atribui um opção ao formulario
        $("#editEvento").show();                                                                                      // exibe o formulario
      }
    },
    {
      label: "<i class=\'glyphicon glyphicon-pencil\'></i>",
      onClick: function(args) {
        vm.editar = args.calendarEvent;
        vm.editar.op = "Editar";                                                                                       //atribui o evento ao objeto responsavel pelo formulario de edição
        $("#editEvento").show();
      }
    }
    ];

    /***********************************************************
    configurando a entrada e saida de dados
    ************************************************************/
  $scope.init = function () {                                                                                         //função que carrega os eventos e exibe no calendario

    $http.post('/pesquisaEvento').success(function(events) {                                                          //requisita eventos do backend
        events.forEach(event => {                                                                                       //adiciona propriedade de data a estring e as funcoes de editar/deletar evento pro evento(loop)
        event.startsAt = new Date(event.startsAt);                                                                    //data inicio do evento
        event.endsAt   = new Date(event.endsAt);                                                                      //data termino do evento
        event.actions = actions;                                                                                      //acoes atribuidas ao evento
      });

      angular.forEach(events, function(events,value,key) {                                                            //mescla os atributos title e descrição
          events.title = "<b>"+events.titulo+"</b> - "+events.descricao;
      })

      angular.forEach(events, function(events,value,key) { //estabelece a cor a ser exibida no calendario
        var cor = events.color.primary ;
        if     (cor=="#DC143C") {cor = 1}
        else if(cor=="#708090") {cor = 2}
        else if(cor=="#800080") {cor = 3}
        else if(cor=="#FFD700") {cor = 4}
        else if(cor=="#4169E1") {cor = 5}
        else if(cor=="#008000") {cor = 6}
        else { cor="5"}
        events.cor = cor;
      })
      delete vm.events;                                                                                                 //deleta os eventos que estiveren exibidos
      vm.events = events;                                                                                               //adiciona eventos ao objeto que exibira no calendario

    });

  };

  $scope.addEvento = function () {                                                                                     //função adiciona eventos ao bd
    Dados = {                                                                                                          //coleta dados dos formularios usando Jquary
        title     : $("input[name='title']").val(),
        descricao  : $("textarea[name='descricao']").val(),
        startsAt   : $("input[name='startsAt']").val(),
        endsAt     : $("input[name='endsAt']").val(),
        turma      : $("input[name='nometurma']").val(),
        cor        : $('input[name=cor]:checked').val()
    };

    $http.post("/cadastroEvento", Dados)                                                                              //passa os dados para o backend
      .then(
       function(response){/*success */},
       function(response){/*failure */}
    );

    $("#addEvento").hide(150);                                                                                        //esconde o formulario de evento
    $scope.init();

    $("input[name='title']").val("");
    $("input[name='startsAt']").val("");
    $("input[name='endsAt']").val("");
    $("input[name='nometurma']").val("");
    $('input[name=cor]:checked').val("");

  };

  $scope.editarEventoDel = function () {                                                                               //função que deleta eventos ao bd
    Dados = {
        cod_evento : $("input[name='editCodevento']").val(),
        op         : "Deletar" /*$("input[name='editOpcao']").val()*/,
        titulo     : $("input[name='editTitulo']").val(),
        descricao  : $("textarea[name='editDescricao']").val(),
        startsAt   : $("input[name='editDate']").val(),
        endsAt     : $("input[name='editDateFim']").val(),
        turma      : $("input[name='editTurma']").val(),
        cor        : $("input[name='editCor']").val()
    };

    $http.post("/editEvento", Dados)
      .then(
       function(response){/*success callback*/},
       function(response){/*failure callback*/}
    );

    $("#editEvento").hide(150);
    $scope.init();
  };

  $scope.editarEventoEdit = function () {                                                                              //função que edita eventos ao bd
    Dados = {
        cod_evento : $("input[name='editCodevento']").val(),
        op         : "Editar" /*$("input[name='editOpcao']").val()*/,
        titulo     : $("input[name='editTitulo']").val(),
        descricao  : $("textarea[name='editDescricao']").val(),
        startsAt   : $("input[name='editDate']").val(),
        endsAt     : $("input[name='editDateFim']").val(),
        turma      : $("input[name='editTurma']").val(),
        cor        : $('input[name=editCor]:checked').val()
    };

    $http.post("/editEvento", Dados)
      .then(
       function(response){/*success callback*/},
       function(response){/*failure callback*/}
    );

    $("#editEvento").hide(150);
    $scope.init();
  };



  $scope.init();


});
