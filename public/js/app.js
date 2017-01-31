function carregaCampos(){
  var tipo = document.forms["cadastroQuestao"]["tipo"].value;
  if (tipo == "Discursiva") {
    var dados = '<textarea name="gabarito" rows="10" class="form-control" style="resize: none; width:610px;" placeholder="Gabarito"></textarea><br><br>';
    // dados += '<button type="submit" name="cadastrar" class="btn btn-default">Cadastrar</button>';
    document.getElementById("dadosQuest").innerHTML = dados;
  }
  else if (tipo == "Objetiva") {
    var dados = '<input type="text" name="opcA" id="opcA" value="" placeholder="Opção A" class="form-control" style="width:610px;"><br><br>';
    dados += '<input type="text" name="opcB" id="opcB" value="" placeholder="Opção B" class="form-control" style="width:610px;"><br><br>';
    dados += '<input type="text" name="opcC" id="opcC" value="" placeholder="Opção C" class="form-control" style="width:610px;"><br><br>';
    dados += '<input type="text" name="opcD" id="opcD" value="" placeholder="Opção D" class="form-control" style="width:610px;"><br><br>';
    dados += '<input type="text" name="opcE" id="opcE" value="" placeholder="Opção E" class="form-control" style="width:610px;"><br><br>';
    dados += '<select class="form-control" name="gabarito" style="width:110px;">';
    dados += '<option disabled selected value="">Gabarito</option>';
    dados += '<option>A</option>';
    dados += '<option>B</option>';
    dados += '<option>C</option>';
    dados += '<option>D</option>';
    dados += '<option>E</option></select><br><br>';
    // dados += '<button type="button" name="cadastrarObj" id="cadastrarObj" class="btn btn-default">Cadastrar</button>';
    document.getElementById("dadosQuest").innerHTML = dados;
  }
}

function consulQuest(){

  var tipo = document.forms["consultaQuest"]["autor"].value;
  if (tipo != "Autor") {
    var dados = '<button type="submit" name="cadastrar" class="btn btn-default">Cadastrar</button>';
    document.getElementById("dadosQuest").innerHTML = dados;

  }

}


function campoPreenchido(formulario, campo, mensagem){
  var valorDoCampo = document.forms[formulario][campo].value;
  if ((valorDoCampo == null || valorDoCampo == "")){
      return false;
    }
    else {
      return true;
    }
}
function onlyNumber(numeroCamp){

       $(numeroCamp).keypress(function(e){
                var isInteger_re     = /^\s*(\+|-)?\d+\s*$/;
                var regex            = new RegExp(isInteger_re);
                var str              = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                
                  if (regex.test(str)) {
                      return true;
                  }

                e.preventDefault();
                return false;
            });

}
function onlyLetter(idCamp){
  $(idCamp).keypress(function(e){
           var isInteger_re     = /^[a-zA-Z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ_ ]+$/;;
           var regex            = new RegExp(isInteger_re);
           var str              = String.fromCharCode(!e.charCode ? e.which : e.charCode);

             if (regex.test(str)) {
                 return true;
             }

           e.preventDefault();
           return false;
       });

}

 function validaCpf(campoId){

$(campoId).keydown(function(){
    if($(campoId).val().length < 11){
        $(campoId).mask("999.999.999-99");
    }                  
});

}
 function validaCelular(campoId){

$(campoId).keydown(function(){
    if($(campoId).val().length < 14){
        $(campoId).mask("(99)99999-9999");
    }                  
});

}
 function validaNasc(campoId){

$(campoId).keydown(function(){
    if($(campoId).val().length < 14){
        $(campoId).mask("99/99/9999");
    }                  
});

}
/*<script>
jQuery.fn.extend({
  check: function() {
    return this.each(function() {
      this.checked = true;
    });
  },
  uncheck: function() {
    return this.each(function() {
      this.checked = false;
    });
  }
});
 */
 
// Use the newly created .check() method
/*$( "input[type='checkbox']" ).check();
</script>
 */
     
