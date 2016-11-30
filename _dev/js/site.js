$(function(){
    $('nav a, .rsvp').smoothScroll({
        offset: -50
    });

    $(window).on('rsvpify', function(){
        var $iframe = $('<iframe />', {
            'src': 'http://romickuhn.app.rsvpify.com/',
            'id': 'RSVPifyIFrame',
            'allowtransparency': 'true',
            'frameborder': 'no',
            'scrolling': 'no'
        }).on('load', function(){
            iFrameResize({autoResize: true,heightCalculationMethod: 'max',enablePublicMethods: true}, "#RSVPifyIFrame");
        });

        $iframe.appendTo($('.rsvpify'));
    })
    .on('scroll', function(){
        $(window).trigger('rsvpify').off('rsvpify')
    });
});