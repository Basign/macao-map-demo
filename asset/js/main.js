function Popup(params) {
    $(document).on('click', '.pC>.p1', function() {
        $('.pp').velocity({bottom: 0});
    });

    $(document).on('click', '.pp>.p2>.close', function() {
        // 270px + 12px
        $('.pp').velocity({bottom: '-282px'});
    });
}

var popup = new Popup();
