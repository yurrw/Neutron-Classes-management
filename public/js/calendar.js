                
angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap']);
angular
.module('mwl.calendar.docs')
.controller('sgeCtrl', function(moment, calendarConfig,$scope, $http,$window) {

  var vm = this;
  
  vm.calendarView = 'month'; 
  vm.viewDate = new Date();   
  
  vm.events = [];

  var actions = [
    {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {        
        vm.editar = args.calendarEvent;
        vm.editar.op = "Deletar";
        $("#editEvento").show();
      }      
    }, 
    {
      label: "<i class=\'glyphicon glyphicon-pencil\'></i>",
      onClick: function(args) {        
        vm.editar = args.calendarEvent;
        vm.editar.op = "Editar";
        $("#editEvento").show();
      }
    }
    ];


  /*-------------------------------------------------------------------------------------
  --------------------------------- Aparte da aplicação --------------------------------- 
  ------------------------------------------------------------------------s--------------*/

  

/*  $scope.addEventoCalendario = function (addEvento) {

    $http({
      url: "/cadastroEvento",
      method: "POST",
      data:addEvento
      }).success(function(data, status, headers, config) {
          //$scope.data = data;
      }).error(function(data, status, headers, config) {
          //$scope.status = status;

    });


    console.log(addEvento);
    $scope.vm.events.push(angular.copy(addEvento));
   $scope.init();
   
  };
*/
  
  $scope.addEvento = function () {
    
    Dados = {
        title     : $("input[name='title']").val(),  
        descricao  : $("textarea[name='descricao']").val(),
        startsAt   : $("input[name='startsAt']").val(),
        endsAt     : $("input[name='endsAt']").val(),
        turma      : $("input[name='nometurma']").val(),
        cor        : $('input[name=cor]:checked').val()
    };

    $http.post("/cadastroEvento", Dados)
      .then(
       function(response){/*success callback*/}, 
       function(response){/*failure callback*/}
    );

    $("#addEvento").hide(150);
    $scope.init();   


    $("input[name='title']").val("");
    $("input[name='startsAt']").val("");
    $("input[name='endsAt']").val("");
    $("input[name='nometurma']").val("");
    $('input[name=cor]:checked').val("");

  };

  $scope.editarEventoDel = function () {
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

  $scope.editarEventoEdit = function () {
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


  $scope.init = function () {
    delete vm.events;

    $http.post('/pesquisaEvento').success(function(events) {    
      // adiciona propriedade de data a estring e as funcoes de editar/deletar
      events.forEach(event => { 
        event.startsAt = new Date(event.startsAt); 
        event.endsAt   = new Date(event.endsAt); 
        
        event.actions = actions; 
      });

      angular.forEach(events, function(events,value,key) { //mescla os atributos title e descrição      
          events.title = "<b>"+events.titulo+"</b> - "+events.descricao;
      })

      angular.forEach(events, function(events,value,key) { //mescla os atributos title e descrição      
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

      vm.events = events;
    });    

  };

  $scope.init();

});


