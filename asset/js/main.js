function Popup() {
    function togglePopup() {
        $('.pC>.pp').toggleClass('open');
    }

    $(document).on('click', '.pC>.p1', togglePopup);

    $(document).on('click', '.pC>.pp .close', togglePopup);
}

var popup = new Popup();

function MenuList() {
    $(document).on('click', '.ml>.tB', function () {
        // $('.mllf>div').css('background', 'url(http://b3-q.mafengwo.net/s6/M00/11/72/wKgB4lMVcpmAQQlRAAGw8ilAe8M38.jpeg?im…nail%2F%211360x940r%2Fgravity%2FCenter%2Fcrop%2F%211360x940%2Fquality%2F90) 0 / cover fixed');

        if ($(this).hasClass('menu-open')) {
            $(this).removeClass('menu-open').find('img').attr('src', 'asset/img/menu.svg');
            $('.ml').removeClass('open1 open2');
        } else {
            $(this).addClass('menu-open').find('img').attr('src', 'asset/img/close-2.svg');
            $('.ml').addClass('open1');
        }
    });

    $(document).on('click', '.pn>.pnt', function () {
        if ($(this).closest('.pn').hasClass('open')) {
            $(this).find('[alt="down-caret"]').removeClass('open').closest('.pn').removeClass('open').removeAttr('style');
        } else {
            $('.pn.open').removeClass('open').removeAttr('style');
            var height = ($(this).siblings().length + 1) * (72 + 2) - 2;
            $(this).find('[alt="down-caret"]').addClass('open').closest('.pn').addClass('open').css('height', height + 'px');
        }
    });
}

var menuList = new MenuList();
