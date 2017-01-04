function showMessage(divID) {                               //MOSTRA MENSAGEM DE ERRO,SUCESSO OU PREENCHIMENTO NA TELA

    $(divID).show().delay(5000).queue(function() {      //Mostra a div passada depois de 5000ms
        $(this).slideUp().dequeue();                    //slideUp pra div desparecer
    });
}