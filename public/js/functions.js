function showMessage(divID) {                               //MOSTRA MENSAGEM DE ERRO,SUCESSO OU PREENCHIMENTO NA TELA

    $(divID).show().delay(5000).queue(function() {      //Mostra a div passada depois de 5000ms
        $(this).slideUp().dequeue();                    //slideUp pra div desparecer
    });
}

function filtraBusca(resultado){

  return resultado != "" && resultado != "Disciplina" && resultado != "Série" && resultado != "Tipo" && resultado != null;

};

function openDesc(i){
    // $(".descEvt").show();

    $("#subDesc"+i+"").toggle();
}