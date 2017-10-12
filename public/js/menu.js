var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('sid'),
    'padding': 270,
    'tolerance': 70,
    'easing': 'cubic-bezier(.51,2,.81,.41)',
});
slideout.open();

$(".toggle-button").click(function() {
    slideout.toggle();
});


$(document).ready(function() {

    $(window).resize(function(){
        if ($(window).width() <= 1024){
    
            slideout.close();
    
        }else {
            slideout.open();
        }
    });
});