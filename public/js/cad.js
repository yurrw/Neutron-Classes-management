$(function() {
  var matrula = "";                                      // matricula (nao sei pq colocaram matrula)
  var drdg = 0;                                          // Regula o Drag and Drop do campo da foto
 
  $(".formCfoto").hide();                                // Form da Foto

  onlyNumber("#matricula");                              // OnlyNumber permite apenas números
  onlyNumber("#cpf");
  onlyNumber("#celular");
  onlyNumber("#datepicker");
  onlyLetter("#nome");                                   // Apenas letras
  validaCpf("#cpf");                                     // formata cpf
  validaNasc("#datepicker");                             // formata data
  validaCelular("#celular");                             // formata cel

 
  $("#datepicker").datepicker({                          //CONFIGURAÇÃO DO CALENDÁRIO
    yearRange: '1900:2050',
    changeMonth: true,
    changeYear: true,
    altFormat: "yy-mm-dd",
    altField: "#alt-date",
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    nextText: 'Próximo',
    prevText: 'Anterior'
  });

  function fileSelect(evt) {
    evt.stopPropagation();                                                          // Impede a propagacao do evento de por a foto (drag and drop)
    evt.preventDefault();                                                           // Para a acao padrao de jogar a foto na tela
    if (window.File && window.FileReader && window.FileList && window.Blob) {       // Checa se o browser suporta           
      if (drdg == 1) {                                                              // Checa se há um drdg em uso, se sim , ele o 'atribui' à files                                 
        var files = evt.dataTransfer.files;
      } else var files = evt.target.files;
      drdg = 0;                                                                     // Reseta o drag and drop                                                               
      var result = '';
      var file;
      for (var i = 0; file = files[i]; i++) {
        if (!file.type.match('image.*')) {
          continue;
        }
        reader = new FileReader();                                                  // Le os buffers 
        reader.onload = (function(tFile) {
          return function(evt) {
            dropTarget.src = evt.target.result;                                      
          };
        }(file));
        reader.readAsDataURL(file);                                                 // Le o arq File
        var mtrs = $('#matricula').val();
        result += '<li>' + mtrs + ' ' + file.size + ' bytes</li>';                  // Preenche o campo do botao em baixo
      }
    } else {
      alert('Esse Browser nao suporta todo conteudo desse site');
    }
  }

  function dragOver(evt) {                                                          // Evento de Drag and Drop
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';                                           // Controla o que o user vai ver
    drdg = 1;                                                                       // Confirma que houve um drag and drop
  }

  var inputs = document.querySelectorAll('.inputfile');                             // seleciona tudo que tenha a classe '.inputfile'

  Array.prototype.forEach.call(inputs, function(input) {                            // For each pra percorrer os inputs e depois mudas o conteudo do botao
    var label    = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function(e) {
      var fileName = '';
      if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      else fileName = e.target.value.split('\\').pop();
      console.log(fileName);
      if (fileName) label.querySelector('span').innerHTML = fileName;
      else label.innerHTML = labelVal;
    });

  });

  var dropTarget = document.getElementById('dropTarget');
  dropTarget.addEventListener('dragover', dragOver, false);
  dropTarget.addEventListener('drop', fileSelect, false);
  document.getElementById('userPhoto').addEventListener('change', fileSelect, false);

  /*SUBMIT----------------------------------------------------------------*/


  $("#btn-cad").click(function() {                                          //No evento do click do botão cadastrar, serão colhidas as informações colocadas pelo usuário
    var emailUser = $('#email').val();
    var senhaUser = $('#senha').val();
    var matriculaUser = $('#matricula').val();
    var nomeUser = $('#nome').val();
    var categoriaUser = $('#categoria').val();
    var dataUser = $('#alt-date').val();
    var cpfUser = $('#cpf').val();
    var celularUser = $('#celular').val();
    $.ajax({
      url: "/cadastro",
      type: "POST",
      dataType: "json",
      async: false,                                                         //desabilita assincronicidade 
      data: JSON.stringify({
        email: emailUser,
        senha: senhaUser,
        matricula: matriculaUser,
        nome: nomeUser,
        categoria: categoriaUser,
        data: dataUser,
        cpf: cpfUser,
        celular: celularUser,

      }),
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      complete: function() {
        matrula = $('#matricula').val();

        document.getElementById("matriculaPost").innerHTML = $('#matricula').val();
        $("#matriculaPost").val($('#matricula').val());
        $("#matriculaSend").val(matrula);
        document.getElementById("nomemat").innerHTML = $('#nome').val();
        
        $(".formCfoto").animate({                                         // Faz formulario da foto aparecer 
          height: 'toggle'
        }, 200);
        $(".all").animate({
          height: 'toggle'
        }, 200);
      },
      success: function(data) {},
      error: function() {},
    });
  });
});