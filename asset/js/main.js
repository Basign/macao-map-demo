function Popup() {
    function togglePopup() {
        $('.pC>.pp').toggleClass('open');
    }

    $(document).on('click', '.pC>.p1', togglePopup);

    $(document).on('click', '.pC>.pp .close', togglePopup);
}

var popup = new Popup();

function MenuList() {
    var self = this;

    $(document).on('click', '.ml>.tB', function () {
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

    $(document).on('click', '.mlri>.close', function () {
        $('.ml').removeClass('open2');
    });

    $(document).on('click', '.mlrc>.tg', function () {
        if ($(this).hasClass('text-open')) {
            $('.sdC').css('max-height', '80px');
            $(this).children().html('展开');
        } else {
            $('.sdC').css('max-height', 'unset');
            $(this).children().html('收起');
        }
        $(this).toggleClass('text-open');
    });

    $(document).on('click', '.pn>div:not(.pnt)', function () {
        var id = $(this).data('location-id');
        self.initLocationDetail(site[id]);

        $('.ml').addClass('open2');
    });
}
MenuList.prototype.initLocationDetail = function (obj) {
    $('.mlr').scrollTop(0);

    $('.mlrt').css('background-image', 'url(' + obj.image + ')');
    $('.opening-hours').html(obj.openingHours);
    $('.site-location').html(obj.location);
    $('.site-name').html(obj.name);
    $('.site-description').html(obj.description);

    var tempHtml = '';
    for (loc of obj.relatedLocations) {
        tempHtml += '<div class="bxi">' +
            '      <div>' +
            '        <img src="' + loc.image + '" alt="related-locations" srcset="">' +
            '      </div>' +
            '      <span>' + loc.name + '</span>' +
            '    </div>';
    }
    $('.lC').html(tempHtml);
};

var menuList = new MenuList();
