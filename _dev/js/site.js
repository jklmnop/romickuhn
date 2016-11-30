$(function(){
    $('nav a, .rsvp').smoothScroll({
        offset: -50
    });

    $(window)
        .on('scroll', function(){
            $(window).trigger('rsvpify').off('rsvpify');
        })
        .on('rsvpify', function(){
            $('.rsvpify')
                .attr('src', 'rsvpify.html')
                .on('ready', function(){
                    $('.rsvpify').attr('src', 'rsvpify.html');
                });
        })
        .on('message', function(event) {
            $('.rsvpify').height(event.originalEvent.data);
        });
});