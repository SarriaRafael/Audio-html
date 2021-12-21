console.log('estoy en el browser o navegador   :)');


$(function(){

    var audio= $('audio');

    function rafalosuena(){
        $.ajax({
            url: '/canciones'  //canciones
        }).done(function(k){
            var lista = $('.lista-temas');
            lista.empty();            
            k.forEach(element => {
                var elemlist = $('<li class="cancion">'+element+'</li>');
                elemlist 
                .on('click',{nomb:element},rafaplay)                   
                .appendTo(lista)  ;           
            });
        }).fail(function(){
            alert('Algo esta fallando.....')
        })
    }

    function rafaplay(event){
        console.log(event);
        audio[0].pause();
        audio.attr('src','/canciones/'+event.data.nomb);
        audio[0].play();
    }

    rafalosuena();
});