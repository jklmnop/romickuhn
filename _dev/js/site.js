$(function(){
    $('nav a, .rsvp').smoothScroll({
        offset: -50
    });

    setTimeout(function(){
        $('.rsvpify').attr('src', 'rsvpify.html');
    }, 2000);
});